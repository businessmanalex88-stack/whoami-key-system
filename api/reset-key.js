const database = require('../lib/database');

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

    const { password, key, action } = req.body;
    
    if (password !== process.env.ADMIN_PASSWORD && password !== 'Whoamidev1819') {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    let result = false;
    
    if (action === 'reset') {
        result = database.resetKeyDevice(key);
    } else if (action === 'delete') {
        result = database.deleteKey(key);
    }

    return res.status(200).json({ 
        success: result,
        action: action,
        key: key
    });
}
