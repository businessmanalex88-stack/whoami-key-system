const crypto = require('crypto');

// Simple in-memory database
let database = {
    keys: {},
    settings: {
        key_prefix: "WARPAH_"
    }
};

function generateKey(duration = '30d') {
    const keyId = database.settings.key_prefix + crypto.randomBytes(16).toString('hex').toUpperCase();
    const expiry = calculateExpiry(duration);
    
    database.keys[keyId] = {
        key: keyId,
        created: Date.now(),
        expires: expiry,
        active: true,
        device_id: null,
        user_id: null,
        usage_count: 0,
        last_used: null
    };
    
    return keyId;
}

function calculateExpiry(duration) {
    const now = Date.now();
    const units = {
        'd': 24 * 60 * 60 * 1000,
        'h': 60 * 60 * 1000,
        'm': 60 * 1000
    };
    
    const match = duration.match(/^(\d+)([dhm])$/);
    if (!match) return now + (30 * units.d);
    
    const [, amount, unit] = match;
    return now + (parseInt(amount) * units[unit]);
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
        const { password, duration = '30d', count = 1 } = req.body;
        
        if (password !== 'Whoamidev1819') {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const keys = [];
        for (let i = 0; i < Math.min(count, 100); i++) {
            const newKey = generateKey(duration);
            keys.push(newKey);
        }

        return res.status(200).json({ 
            success: true, 
            keys: keys,
            count: keys.length
        });
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            error: 'Server error' 
        });
    }
}
