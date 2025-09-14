// /api/admin.js - Key Management API
import fs from 'fs';
import path from 'path';

const KEYS_FILE = '/tmp/keys.json';

// Helper function to read keys from storage
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

// Helper function to write keys to storage
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

export default function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { password, action } = req.method === 'GET' ? req.query : req.body;

    // Verify admin password
    if (password !== 'Whoamidev1819') {
      return res.status(401).json({
        success: false,
        error: 'Invalid admin password'
      });
    }

    // Handle POST requests for actions like clearing keys
    if (req.method === 'POST' && action === 'clear_all_keys') {
      try {
        writeKeys([]); // Clear all keys
        return res.status(200).json({
          success: true,
          message: 'All keys cleared successfully',
          total: 0,
          active: 0
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          error: 'Failed to clear keys: ' + error.message
        });
      }
    }

    // Read keys from storage
    const keys = readKeys();
    const now = Date.now();

    // Filter active keys (not expired)
    const activeKeys = keys.filter(key => 
      key.active !== false && (!key.expires || key.expires > now)
    );

    // Prepare detailed key information
    const detailedKeys = keys.map(key => ({
      key: key.key,
      active: key.active !== false && (!key.expires || key.expires > now),
      device_id: key.device_id || null,
      device_bound: !!key.device_id,
      usage_count: key.usage_count || 0,
      expires: key.expires || (Date.now() + 24 * 60 * 60 * 1000), // Default 24 hours
      created_at: key.created_at || Date.now(),
      last_used: key.last_used || null
    }));

    // Return comprehensive admin data
    return res.status(200).json({
      success: true,
      total: keys.length,
      active: activeKeys.length,
      expired: keys.length - activeKeys.length,
      keys: detailedKeys,
      storage_type: 'file_system',
      storage_path: KEYS_FILE,
      timestamp: Date.now(),
      last_updated: keys.length > 0 ? Math.max(...keys.map(k => k.created_at || 0)) : null
    });

  } catch (error) {
    console.error('Admin API Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error: ' + error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}
