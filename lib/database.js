const crypto = require('crypto');

class Database {
    constructor() {
        this.data = {
            keys: {},
            usage_logs: [],
            settings: {
                max_keys: 1000,
                key_prefix: "WARPAH_"
            }
        };
        this.loadData();
    }

    loadData() {
        // Di production, ini akan menggunakan database eksternal
        // Untuk sementara kita simpan di memory
        if (typeof global !== 'undefined' && global.keySystemData) {
            this.data = global.keySystemData;
        }
    }

    saveData() {
        if (typeof global !== 'undefined') {
            global.keySystemData = this.data;
        }
    }

    generateKey(duration = '30d') {
        const keyId = this.data.settings.key_prefix + crypto.randomBytes(16).toString('hex').toUpperCase();
        const expiry = this.calculateExpiry(duration);
        
        this.data.keys[keyId] = {
            key: keyId,
            created: Date.now(),
            expires: expiry,
            active: true,
            device_id: null,
            user_id: null,
            usage_count: 0,
            last_used: null
        };
        
        this.saveData();
        return keyId;
    }

    validateKey(key, deviceId, userId) {
        const keyData = this.data.keys[key];
        
        if (!keyData || !keyData.active) {
            return { success: false, reason: "Invalid key" };
        }

        if (Date.now() > keyData.expires) {
            return { success: false, reason: "Key expired" };
        }

        // Check device binding
        if (keyData.device_id === null) {
            // First time use - bind to device
            keyData.device_id = deviceId;
            keyData.user_id = userId;
        } else if (keyData.device_id !== deviceId) {
            return { success: false, reason: "Key already bound to another device" };
        }

        // Update usage
        keyData.usage_count++;
        keyData.last_used = Date.now();
        this.saveData();

        // Log usage
        this.logUsage(key, userId, deviceId);

        return { success: true, keyData: keyData };
    }

    resetKeyDevice(key) {
        const keyData = this.data.keys[key];
        if (keyData) {
            keyData.device_id = null;
            keyData.user_id = null;
            this.saveData();
            return true;
        }
        return false;
    }

    deleteKey(key) {
        if (this.data.keys[key]) {
            delete this.data.keys[key];
            this.saveData();
            return true;
        }
        return false;
    }

    getAllKeys() {
        return Object.values(this.data.keys);
    }

    logUsage(key, userId, deviceId) {
        this.data.usage_logs.push({
            key: key,
            user_id: userId,
            device_id: deviceId,
            timestamp: Date.now(),
            action: 'validate'
        });

        // Keep only last 1000 logs
        if (this.data.usage_logs.length > 1000) {
            this.data.usage_logs = this.data.usage_logs.slice(-1000);
        }

        this.saveData();
    }

    calculateExpiry(duration) {
        const now = Date.now();
        const units = {
            'd': 24 * 60 * 60 * 1000,
            'h': 60 * 60 * 1000,
            'm': 60 * 1000
        };
        
        const match = duration.match(/^(\d+)([dhm])$/);
        if (!match) return now + (30 * units.d); // Default 30 days
        
        const [, amount, unit] = match;
        return now + (parseInt(amount) * units[unit]);
    }
}

module.exports = new Database();
