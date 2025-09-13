const database = require('../lib/database');
const crypto = require('crypto');

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

    const result = database.validateKey(key, deviceId, user_id);
    
    return res.status(200).json(result);
}
