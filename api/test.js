// /api/test.js - System Testing API
import fs from 'fs';

const KEYS_FILE = '/tmp/keys.json';

export default function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Check storage file existence and permissions
    let storageInfo = {
      file_exists: fs.existsSync(KEYS_FILE),
      file_path: KEYS_FILE,
      readable: false,
      writable: false,
      keys_count: 0
    };

    if (storageInfo.file_exists) {
      try {
        // Test read access
        const data = fs.readFileSync(KEYS_FILE, 'utf8');
        const parsedData = JSON.parse(data);
        storageInfo.readable = true;
        storageInfo.keys_count = parsedData.keys ? parsedData.keys.length : 0;
        storageInfo.last_updated = parsedData.last_updated;
        
        // Test write access
        const testData = { ...parsedData, test_write: Date.now() };
        fs.writeFileSync(KEYS_FILE, JSON.stringify(testData, null, 2));
        storageInfo.writable = true;
        
        // Restore original data
        fs.writeFileSync(KEYS_FILE, JSON.stringify(parsedData, null, 2));
      } catch (error) {
        storageInfo.error = error.message;
      }
    } else {
      // Try to create the file
      try {
        const initialData = {
          keys: [],
          last_updated: Date.now(),
          version: '1.0'
        };
        fs.writeFileSync(KEYS_FILE, JSON.stringify(initialData, null, 2));
        storageInfo.file_exists = true;
        storageInfo.readable = true;
        storageInfo.writable = true;
        storageInfo.created_now = true;
      } catch (error) {
        storageInfo.creation_error = error.message;
      }
    }

    // System information
    const systemInfo = {
      timestamp: Date.now(),
      iso_timestamp: new Date().toISOString(),
      node_env: process.env.NODE_ENV || 'development',
      platform: process.platform,
      node_version: process.version,
      memory_usage: process.memoryUsage(),
      uptime: process.uptime()
    };

    // API endpoints status
    const endpoints = [
      '/api/test',
      '/api/admin',
      '/api/create-key', 
      '/api/validate',
      '/api/reset-key',
      '/api/usage-log'
    ];

    return res.status(200).json({
      success: true,
      message: 'WarpahVip Key System API is online',
      version: '2.0.0',
      status: 'operational',
      storage: storageInfo,
      system: systemInfo,
      endpoints: endpoints,
      test_keys: [
        'WARPAH_TEST001',
        'WARPAH_TEST002'
      ],
      admin_password_hint: 'Whoamidev1819',
      features: [
        'Key Generation',
        'Key Validation', 
        'Device Binding',
        'Usage Tracking',
        'Admin Management',
        'Key Expiration'
      ],
      diagnostics: {
        storage_ok: storageInfo.readable && storageInfo.writable,
        keys_loaded: storageInfo.keys_count,
        system_healthy: true,
        last_check: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Test API Error:', error);
    return res.status(500).json({
      success: false,
      error: 'System test failed',
      message: error.message,
      timestamp: Date.now(),
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}
