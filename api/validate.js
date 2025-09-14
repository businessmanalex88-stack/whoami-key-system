// Access shared database
function getSharedDatabase() {
  if (!global.keyDatabase) {
    global.keyDatabase = {
      keys: {
        'WARPAH_TEST001': {
          key: 'WARPAH_TEST001',
          created: Date.now(),
          expires: Date.now() + (30 * 24 * 60 * 60 * 1000),
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
      usage_logs: []
    };
  }
  return global.keyDatabase;
}

function validateKey(key, deviceId, userId) {
  const db = getSharedDatabase();
  const keyData = db.keys[key];
  
  if (!keyData || !keyData.active) {
    return { success: false, reason: "Invalid key" };
  }

  if (Date.now() > keyData.expires) {
    return { success: false, reason: "Key expired" };
  }

  // Check device binding
  if (keyData.device_id === null) {
    // First time use - bind to device
    keyData.device_id = deviceId;
    keyData.user_id = userId;
  } else if (keyData.device_id !== deviceId) {
    return { success: false, reason: "Key already bound to another device" };
  }

  // Update usage
  keyData.usage_count++;
  keyData.last_used = Date.now();

  // Log usage
  db.usage_logs.push({
    key: key,
    user_id: userId,
    device_id: deviceId,
    timestamp: Date.now(),
    action: 'validate'
  });

  return { success: true, keyData: keyData };
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

  try {
    const { key, user_id, device_info } = req.body;

    if (!key) {
      return res.status(400).json({
        success: false,
        reason: 'Key is required'
      });
    }

    // Generate device ID
    const deviceId = `${user_id}_${device_info?.id || 'unknown'}`;
    const result = validateKey(key, deviceId, user_id);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      reason: 'Server error'
    });
  }
}
