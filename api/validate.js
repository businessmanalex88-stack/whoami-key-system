const crypto = require('crypto');

// Simple in-memory database
let database = {
    keys: {},
    usage_logs: []
};

function validateKey(key, deviceId, userId) {
    const keyData = database.keys[key];
    
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

    // Log usage
    database.usage_logs.push({
        key: key,
        user_id: userId,
        device_id: deviceId,
        timestamp: Date.now(),
        action: 'validate'
    });

    return { success: true, keyData: keyData };
}

export default function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { key, user_id, device_info } = req.body;
        
        if (!key || !user_id || !device_info) {
            return res.status(400).json({ 
                success: false, 
                reason: 'Missing required parameters' 
            });
        }

        // Generate unique device ID
        const deviceId = crypto
            .createHash('sha256')
            .update(`${device_info.model}_${device_info.brand}_${device_info.id}_${user_id}`)
            .digest('hex');

        const result = validateKey(key, deviceId, user_id);
        
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            reason: 'Server error' 
        });
    }
}
