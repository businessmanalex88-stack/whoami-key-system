export default function handler(req, res) {
  try {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    // Initialize shared database if not exists
    if (!global.keyDatabase) {
      global.keyDatabase = {
        keys: {
          'WARPAH_TEST001': {
            key: 'WARPAH_TEST001',
            created: Date.now(),
            expires: Date.now() + (30 * 24 * 60 * 60 * 1000),
            active: true,
            device_id: null,
            user_id: null,
            usage_count: 0,
            last_used: null
          },
          'WARPAH_TEST002': {
            key: 'WARPAH_TEST002',
            created: Date.now(),
            expires: Date.now() + (30 * 24 * 60 * 60 * 1000),
            active: true,
            device_id: null,
            user_id: null,
            usage_count: 0,
            last_used: null
          }
        },
        usage_logs: [],
        settings: {
          key_prefix: "WARPAH_"
        }
      };
    }

    if (req.method === 'GET') {
      const { password } = req.query;
      
      if (!password || password !== 'Whoamidev1819') {
        return res.status(200).json({ 
          success: false,
          error: 'Invalid password' 
        });
      }

      const keys = Object.values(global.keyDatabase.keys);
      const activeKeys = keys.filter(k => k.active && Date.now() < k.expires);

      return res.status(200).json({
        success: true,
        keys: keys,
        total: keys.length,
        active: activeKeys.length,
        timestamp: new Date().toISOString()
      });
    }

    if (req.method === 'POST') {
      const { password, count = 1, duration = '30d' } = req.body || {};
      
      if (!password || password !== 'Whoamidev1819') {
        return res.status(200).json({ 
          success: false,
          error: 'Invalid password' 
        });
      }

      const newKeys = [];
      const keyCount = Math.min(parseInt(count) || 1, 10);

      for (let i = 0; i < keyCount; i++) {
        const keyId = generateKey(duration);
        newKeys.push(keyId);
      }

      return res.status(200).json({
        success: true,
        message: `Generated ${newKeys.length} keys`,
        keys: newKeys,
        count: newKeys.length
      });
    }

    return res.status(200).json({ 
      success: false,
      error: 'Method not allowed' 
    });

  } catch (error) {
    console.error('Admin API Error:', error);
    return res.status(200).json({
      success: false,
      error: 'Server error: ' + error.message
    });
  }
}

function generateKey(duration = '30d') {
  try {
    const keyId = global.keyDatabase.settings.key_prefix + Math.random().toString(36).substr(2, 10).toUpperCase();
    const expiry = Date.now() + (30 * 24 * 60 * 60 * 1000); // Default 30 days
    
    global.keyDatabase.keys[keyId] = {
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
  } catch (error) {
    return 'WARPAH_ERROR' + Date.now();
  }
}
