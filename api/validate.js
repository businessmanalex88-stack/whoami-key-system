export default function handler(req, res) {
  try {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    if (req.method !== 'POST') {
      return res.status(200).json({ 
        success: false,
        error: 'Method not allowed' 
      });
    }

    // Initialize database
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

    const { key, user_id, device_info } = req.body || {};

    if (!key) {
      return res.status(200).json({
        success: false,
        reason: 'Key is required'
      });
    }

    const keyData = global.keyDatabase.keys[key];
    
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

    // Generate device ID
    const deviceId = `${user_id || 'unknown'}_${device_info?.id || 'device'}`;

    // Check device binding
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

    // Log usage
    global.keyDatabase.usage_logs.push({
      key: key,
      user_id: user_id,
      device_id: deviceId,
      timestamp: Date.now(),
      action: 'validate'
    });

    return res.status(200).json({
      success: true,
      message: 'Key validated successfully',
      keyData: {
        key: keyData.key,
        usage_count: keyData.usage_count,
        expires: keyData.expires,
        device_bound: keyData.device_id !== null
      }
    });

  } catch (error) {
    console.error('Validate Error:', error);
    return res.status(200).json({
      success: false,
      reason: 'Server error: ' + error.message
    });
  }
}
