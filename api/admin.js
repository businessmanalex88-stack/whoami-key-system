// Simple global database
if (!global.db) {
  global.db = {
    keys: {
      'WARPAH_TEST001': {
        key: 'WARPAH_TEST001',
        created: Date.now(),
        expires: Date.now() + (30 * 24 * 60 * 60 * 1000),
        active: true,
        device_id: null,
        user_id: null,
        usage_count: 0
      },
      'WARPAH_TEST002': {
        key: 'WARPAH_TEST002',
        created: Date.now(),
        expires: Date.now() + (30 * 24 * 60 * 60 * 1000),
        active: true,
        device_id: null,
        user_id: null,
        usage_count: 0
      }
    }
  };
}

export default function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  
  const { password } = req.query;
  
  if (password !== 'Whoamidev1819') {
    return res.status(200).json({ success: false, error: 'Wrong password' });
  }

  const keys = Object.values(global.db.keys);
  const active = keys.filter(k => k.active && Date.now() < k.expires);

  res.status(200).json({
    success: true,
    keys: keys,
    total: keys.length,
    active: active.length,
    timestamp: new Date().toISOString()
  });
}
