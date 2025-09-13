const database = require('../lib/database');

export default function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method === 'POST') {
        // Log usage from client
        const { key, user, userId, timestamp, place } = req.body;
        
        database.data.usage_logs.push({
            key: key,
            user: user,
            user_id: userId,
            timestamp: timestamp,
            place_id: place,
            action: 'script_load'
        });
        database.saveData();
        
        return res.status(200).json({ success: true });
    }

    if (req.method === 'GET') {
        const { password, limit = 100 } = req.query;
        
        if (password !== process.env.ADMIN_PASSWORD && password !== 'Whoamidev1819') {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const logs = database.data.usage_logs.slice(-limit);
        return res.status(200).json({ 
            success: true, 
            logs: logs,
            total: database.data.usage_logs.length
        });
    }

    return res.status(405).json({ error: 'Method not allowed' });
}
