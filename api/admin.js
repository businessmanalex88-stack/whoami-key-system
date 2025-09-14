// Import crypto untuk generate keys
const crypto = require('crypto');

// Global database storage yang akan di-share antar functions
if (!global.keyDatabase) {
  global.keyDatabase = {
    keys: {
      'WARPAH_TEST001': {
        key: 'WARPAH_TEST001',
        created: Date.now(),
        expires: Date.now() + (30 * 24 * 60 * 60 * 1000), // 30 days
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

// Helper functions
function getAllKeys() {
  return Object.values(global.keyDatabase.keys);
}

function generateKey(duration = '30d') {
  const keyId = global.keyDatabase.settings.key_prefix + crypto.randomBytes(8).toString('hex').toUpperCase();
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

export default function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    const { password } = req.query;
    
    if (password !== 'Whoamidev1819') {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const keys = getAllKeys();
    return res.status(200).json({
      success: true,
      keys: keys,
      total: keys.length,
      active: keys.filter(k => k.active && Date.now() < k.expires).length,
      timestamp: new Date().toISOString()
    });
  }

  if (req.method === 'POST') {
    // Handle key generation dari admin endpoint
    const { password, count = 1, duration = '30d' } = req.body;
    
    if (password !== 'Whoamidev1819') {
      return res.status(401).json({ error: 'Unauthorized' });
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

  return res.status(405).json({ error: 'Method not allowed' });
}
