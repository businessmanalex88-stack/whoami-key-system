// Database sederhana di memory
const keys = {};

function createTestKey() {
  // Buat beberapa test key otomatis
  if (Object.keys(keys).length === 0) {
    keys['WARPAH_TEST123'] = {
      key: 'WARPAH_TEST123',
      created: Date.now(),
      expires: Date.now() + (30 * 24 * 60 * 60 * 1000), // 30 hari
      active: true,
      device_id: null,
      user_id: null,
      usage_count: 0
    };
  }
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

  createTestKey(); // Pastikan ada test key

  const { key, user_id, device_info } = req.body;

  if (!key) {
    return res.status(400).json({
      success: false,
      reason: 'Key required'
    });
  }

  // Cek key
  const keyData = keys[key];
  if (!keyData || !keyData.active) {
    return res.status(200).json({
      success: false,
      reason: 'Invalid key'
    });
  }

  if (Date.now() > keyData.expires) {
    return res.status(200).json({
      success: false,
      reason: 'Key expired'
    });
  }

  // Generate device ID sederhana
  const deviceId = user_id + '_' + (device_info?.id || 'unknown');

  // Cek device binding
  if (keyData.device_id === null) {
    keyData.device_id = deviceId;
    keyData.user_id = user_id;
  } else if (keyData.device_id !== deviceId) {
    return res.status(200).json({
      success: false,
      reason: 'Key already bound to another device'
    });
  }

  // Update usage
  keyData.usage_count++;
  keyData.last_used = Date.now();

  return res.status(200).json({
    success: true,
    keyData: keyData
  });
}
