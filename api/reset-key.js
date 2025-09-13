// Simple in-memory database
let database = {
    keys: {}
};

function resetKeyDevice(key) {
    const keyData = database.keys[key];
    if (keyData) {
        keyData.device_id = null;
        keyData.user_id = null;
        return true;
    }
    return false;
}

function deleteKey(key) {
    if (database.keys[key]) {
        delete database.keys[key];
        return true;
    }
    return false;
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
        const { password, key, action } = req.body;
        
        if (password !== 'Whoamidev1819') {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        let result = false;
        
        if (action === 'reset') {
            result = resetKeyDevice(key);
        } else if (action === 'delete') {
            result = deleteKey(key);
        }

        return res.status(200).json({ 
            success: result,
            action: action,
            key: key
        });
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            error: 'Server error' 
        });
    }
}
