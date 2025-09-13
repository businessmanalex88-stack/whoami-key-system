const crypto = require('crypto');

// Simple in-memory database (untuk demo)
let database = {
    keys: {},
    usage_logs: [],
    settings: {
        max_keys: 1000,
        key_prefix: "WARPAH_"
    }
};

// Helper functions
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

function getAllKeys() {
    return Object.values(database.keys);
}

export default function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const { password } = req.query;
    
    if (password !== 'Whoamidev1819') {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    if (req.method === 'GET') {
        const keys = getAllKeys();
        return res.status(200).json({ 
            success: true, 
            keys: keys,
            total: keys.length,
            active: keys.filter(k => k.active && Date.now() < k.expires).length
        });
    }

    return res.status(405).json({ error: 'Method not allowed' });
}
