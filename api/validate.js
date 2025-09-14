export default function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  
  if (req.method !== 'POST') {
    return res.status(200).json({ success: false, reason: 'POST only' });
  }

  // Initialize global database
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
        }
      }
    };
  }

  const { key, user_id, device_info } = req.body;

  if (!key) {
    return res.status(200).json({ success: false, reason: 'Key required' });
  }

  const keyData = global.db.keys[key];

  if (!keyData || !keyData.active) {
    return res.status(200).json({ success: false, reason: 'Invalid key' });
  }

  if (Date.now() > keyData.expires) {
    return res.status(200).json({ success: false, reason: 'Key expired' });
  }

  const deviceId = user_id + '_' + (device_info?.id || 'unknown');

  // Check device binding
  if (keyData.device_id === null) {
    keyData.device_id = deviceId;
    keyData.user_id = user_id;
  } else if (keyData.device_id !== deviceId) {
    return res.status(200).json({ success: false, reason: 'Key bound to another device' });
  }

  // Update usage
  keyData.usage_count++;

  res.status(200).json({
    success: true,
    keyData: {
      key: keyData.key,
      usage_count: keyData.usage_count,
      expires: keyData.expires,
      device_bound: keyData.device_id !== null
    }
  });
}
