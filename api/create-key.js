// Key storage
const keys = {};

function generateRandomKey() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'WARPAH_';
  for (let i = 0; i < 12; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed' 
    });
  }

  const { password, count = 1 } = req.body || {};

  if (password !== 'Whoamidev1819') {
    return res.status(401).json({ 
      success: false, 
      error: 'Unauthorized' 
    });
  }

  const newKeys = [];
  const keyCount = Math.min(parseInt(count) || 1, 10); // Max 10 keys

  for (let i = 0; i < keyCount; i++) {
    const keyId = generateRandomKey();
    const keyData = {
      key: keyId,
      created: Date.now(),
      expires: Date.now() + (30 * 24 * 60 * 60 * 1000), // 30 days
      active: true,
      device_id: null,
      user_id: null,
      usage_count: 0
    };
    
    keys[keyId] = keyData;
    newKeys.push(keyId);
  }

  return res.status(200).json({
    success: true,
    message: `Generated ${newKeys.length} keys`,
    keys: newKeys,
    count: newKeys.length
  });
}
