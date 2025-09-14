// /api/validate.js - Key Validation API
import fs from 'fs';

const KEYS_FILE = '/tmp/keys.json';

// Helper function to read keys
function readKeys() {
  try {
    if (fs.existsSync(KEYS_FILE)) {
      const data = fs.readFileSync(KEYS_FILE, 'utf8');
      const parsedData = JSON.parse(data);
      return parsedData.keys || [];
    }
    return [];
  } catch (error) {
    console.error('Error reading keys:', error);
    return [];
  }
}

// Helper function to write keys
function writeKeys(keys) {
  try {
    const data = {
      keys: keys,
      last_updated: Date.now(),
      version: '1.0'
    };
    fs.writeFileSync(KEYS_FILE, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing keys:', error);
    return false;
  }
}

// Generate device fingerprint from device info
function generateDeviceFingerprint(deviceInfo) {
  if (!deviceInfo) return null;
  
  const { id, model, brand, os, version } = deviceInfo;
  return `${id || 'unknown'}_${model || 'unknown'}_${brand || 'unknown'}`.toLowerCase();
}

export default function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed. Use POST.',
      reason: 'invalid_method'
    });
  }

  try {
    const { key, user_id, device_info } = req.body;

    // Validate required parameters
    if (!key) {
      return res.status(400).json({
        success: false,
        error: 'Key is required',
        reason: 'missing_key'
      });
    }

    if (!user_id) {
      return res.status(400).json({
        success: false,
        error: 'User ID is required',
        reason: 'missing_user_id'
      });
    }

    // Read keys from storage
    const keys = readKeys();
    
    // Find the key
    const keyIndex = keys.findIndex(k => k.key === key);
    
    if (keyIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Key not found',
        reason: 'key_not_found',
        key: key
      });
    }

    const keyData = keys[keyIndex];
    const now = Date.now();

    // Check if key is active
    if (keyData.active === false) {
      return res.status(403).json({
        success: false,
        error: 'Key has been deactivated',
        reason: 'key_deactivated',
        keyData: {
          key: keyData.key,
          status: 'deactivated'
        }
      });
    }

    // Check if key has expired
    if (keyData.expires && keyData.expires <= now) {
      // Mark key as inactive
      keys[keyIndex].active = false;
      writeKeys(keys);
      
      return res.status(403).json({
        success: false,
        error: 'Key has expired',
        reason: 'key_expired',
        keyData: {
          key: keyData.key,
          expires: keyData.expires,
          expired_at: new Date(keyData.expires).toISOString()
        }
      });
    }

    // Generate device fingerprint
    const deviceFingerprint = generateDeviceFingerprint(device_info);

    // Check device binding
    if (keyData.device_id) {
      // Key is already bound to a device
      if (keyData.device_id !== deviceFingerprint) {
        return res.status(403).json({
          success: false,
          error: 'Key is bound to another device',
          reason: 'device_mismatch',
          keyData: {
            key: keyData.key,
            device_bound: true,
            current_device: deviceFingerprint,
            bound_device: keyData.device_id
          }
        });
      }
    } else {
      // Bind key to this device (first time use)
      keys[keyIndex].device_id = deviceFingerprint;
      keys[keyIndex].device_bound = true;
      keys[keyIndex].first_used_at = now;
    }

    // Update usage statistics
    keys[keyIndex].usage_count = (keyData.usage_count || 0) + 1;
    keys[keyIndex].last_used = now;
    keys[keyIndex].last_user_id = user_id;

    // Save updated keys
    const saveSuccess = writeKeys(keys);
    if (!saveSuccess) {
      console.error('Failed to save key updates');
      // Continue anyway, don't fail validation
    }

    // Successful validation
    return res.status(200).json({
      success: true,
      message: 'Key validation successful',
      valid: true,
      keyData: {
        key: keyData.key,
        usage_count: keys[keyIndex].usage_count,
        device_bound: !!keys[keyIndex].device_id,
        expires: keyData.expires,
        expires_in: keyData.expires ? Math.max(0, keyData.expires - now) : null,
        first_use: !keyData.device_id, // True if this was first use
        device_fingerprint: deviceFingerprint
      },
      user_id: user_id,
      timestamp: now,
      expires_at: keyData.expires ? new Date(keyData.expires).toISOString() : null
    });

  } catch (error) {
    console.error('Validation Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error during validation',
      reason: 'server_error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
