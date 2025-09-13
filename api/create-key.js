const keys = {};

function generateRandomKey() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'WARPAH_';
  for (let i = 0; i < 16; i++) {
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
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { password, duration = '30d', count = 1 } = req.body;

  if (password !== 'Whoamidev1819') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const newKeys = [];
  const durationMs = 30 * 24 * 60 * 60 * 1000; // 30 hari default

  for (let i = 0; i < Math.min(count, 10); i++) {
    const keyId = generateRandomKey();
    keys[keyId] = {
      key: keyId,
      created: Date.now(),
      expires: Date.now() + durationMs,
      active: true,
      device_id: null,
      user_id: null,
      usage_count: 0
    };
    newKeys.push(keyId);
  }

  return res.status(200).json({
    success: true,
    keys: newKeys,
    count: newKeys.length
  });
}
