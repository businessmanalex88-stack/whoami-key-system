export default function handler(req, res) {
  try {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    // Initialize database
    if (!global.keyDatabase) {
      global.keyDatabase = {
        usage_logs: []
      };
    }

    if (req.method === 'POST') {
      try {
        const { key, user, userId, timestamp, place } = req.body || {};
        
        global.keyDatabase.usage_logs.push({
          key: key,
          user: user,
          user_id: userId,
          timestamp: timestamp || Date.now(),
          place_id: place,
          action: 'script_load'
        });
        
        // Keep only last 1000 logs
        if (global.keyDatabase.usage_logs.length > 1000) {
          global.keyDatabase.usage_logs = global.keyDatabase.usage_logs.slice(-1000);
        }
        
        return res.status(200).json({ success: true });
      } catch (error) {
        return res.status(200).json({ success: false, error: error.message });
      }
    }

    if (req.method === 'GET') {
      const { password, limit = 100 } = req.query;
      
      if (!password || password !== 'Whoamidev1819') {
        return res.status(200).json({ 
          success: false,
          error: 'Invalid password' 
        });
      }

      const logs = global.keyDatabase.usage_logs.slice(-parseInt(limit));
      
      return res.status(200).json({
        success: true,
        logs: logs,
        total: global.keyDatabase.usage_logs.length
      });
    }

    return res.status(200).json({ 
      success: false,
      error: 'Method not allowed' 
    });

  } catch (error) {
    console.error('Usage Log Error:', error);
    return res.status(200).json({
      success: false,
      error: 'Server error: ' + error.message
    });
  }
}
