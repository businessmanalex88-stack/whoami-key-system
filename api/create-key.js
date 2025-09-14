function generateRandomKey() {
  return 'WARPAH_' + Math.random().toString(36).substr(2, 12).toUpperCase();
}

export default function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  
  if (req.method !== 'POST') {
    return res.status(200).json({ success: false, error: 'POST only' });
  }

  const { password, count = 1 } = req.body;

  if (password !== 'Whoamidev1819') {
    return res.status(200).json({ success: false, error: 'Wrong password' });
  }

  // Initialize global database
  if (!global.db) {
    global.db = { keys: {} };
  }

  const newKeys = [];
  const keyCount = Math.min(parseInt(count) || 1, 10);

  for (let i = 0; i < keyCount; i++) {
    const keyId = generateRandomKey();
    
    global.db.keys[keyId] = {
      key: keyId,
      created: Date.now(),
      expires: Date.now() + (30 * 24 * 60 * 60 * 1000), // 30 days
      active: true,
      device_id: null,
      user_id: null,
      usage_count: 0
    };
    
    newKeys.push(keyId);
  }

  res.status(200).json({
    success: true,
    keys: newKeys,
    count: newKeys.length
  });
}
