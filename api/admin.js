// Simple key storage
const keys = {
  'WARPAH_TEST001': {
    key: 'WARPAH_TEST001',
    created: Date.now(),
    expires: Date.now() + (30 * 24 * 60 * 60 * 1000), // 30 days
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
};

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { password } = req.query;
  
  if (password !== 'Whoamidev1819') {
    return res.status(401).json({ 
      success: false, 
      error: 'Unauthorized' 
    });
  }

  const keyList = Object.values(keys);
  const activeKeys = keyList.filter(k => k.active && Date.now() < k.expires);

  res.status(200).json({
    success: true,
    keys: keyList,
    total: keyList.length,
    active: activeKeys.length,
    timestamp: new Date().toISOString()
  });
}
