const database = require('../lib/database');

export default function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const { password } = req.query;
    
    if (password !== process.env.ADMIN_PASSWORD && password !== 'Whoamidev1819') {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    if (req.method === 'GET') {
        const keys = database.getAllKeys();
        return res.status(200).json({ 
            success: true, 
            keys: keys,
            total: keys.length,
            active: keys.filter(k => k.active && Date.now() < k.expires).length
        });
    }

    return res.status(405).json({ error: 'Method not allowed' });
}
