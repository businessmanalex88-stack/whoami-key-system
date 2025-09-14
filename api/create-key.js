export default function handler(req, res) {
  try {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    if (req.method !== 'POST') {
      return res.status(200).json({ 
        success: false,
        error: 'Method not allowed' 
      });
    }

    // Initialize database
    if (!global.keyDatabase) {
      global.keyDatabase = {
        keys: {},
        settings: {
          key_prefix: "WARPAH_"
        }
      };
    }

    const { password, duration = '30d', count = 1 } = req.body || {};

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

  } catch (error) {
    console.error('Create Key Error:', error);
    return res.status(200).json({
      success: false,
      error: 'Server error: ' + error.message
    });
  }
}

function generateKey(duration = '30d') {
  try {
    const keyId = global.keyDatabase.settings.key_prefix + Math.random().toString(36).substr(2, 12).toUpperCase();
    const expiry = calculateExpiry(duration);
    
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
