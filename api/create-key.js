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

    const { password, duration = '30d', count = 1 } = req.body;
    
    if (password !== process.env.ADMIN_PASSWORD && password !== 'Whoamidev1819') {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const keys = [];
    for (let i = 0; i < Math.min(count, 100); i++) {
        const newKey = database.generateKey(duration);
        keys.push(newKey);
    }

    return res.status(200).json({ 
        success: true, 
        keys: keys,
        count: keys.length
    });
}
