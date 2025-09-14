// Access shared database
function getSharedDatabase() {
  if (!global.keyDatabase) {
    global.keyDatabase = {
      usage_logs: []
    };
  }
  return global.keyDatabase;
}

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const { key, user, userId, timestamp, place } = req.body;
      const db = getSharedDatabase();
      
      db.usage_logs.push({
        key: key,
        user: user,
        user_id: userId,
        timestamp: timestamp,
        place_id: place,
        action: 'script_load'
      });
      
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ success: false });
    }
  }

  if (req.method === 'GET') {
    const { password, limit = 100 } = req.query;
    
    if (password !== 'Whoamidev1819') {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const db = getSharedDatabase();
    const logs = db.usage_logs.slice(-limit);
    
    return res.status(200).json({
      success: true,
      logs: logs,
      total: db.usage_logs.length
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
