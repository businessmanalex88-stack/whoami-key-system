// Database sederhana di memory
const keys = {};

export default function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Check password
  const { password } = req.query;
  if (password !== 'Whoamidev1819') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    const keyList = Object.values(keys);
    return res.status(200).json({
      success: true,
      keys: keyList,
      total: keyList.length,
      active: keyList.filter(k => k.active && Date.now() < k.expires).length
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
