// /api/create-key.js - Key Generation API
import fs from 'fs';
import path from 'path';

const KEYS_FILE = '/tmp/keys.json';

// Helper function to read existing keys
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

// Generate random key
function generateKey() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'WARPAH_';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
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
      error: 'Method not allowed. Use POST.'
    });
  }

  try {
    const { password, count = 1, duration = 24 } = req.body;

    // Verify admin password
    if (password !== 'Whoamidev1819') {
      return res.status(401).json({
        success: false,
        error: 'Invalid admin password'
      });
    }

    // Validate count
    const keyCount = Math.min(Math.max(parseInt(count) || 1, 1), 10);
    const keyDuration = Math.max(parseInt(duration) || 24, 1); // hours

    // Read existing keys
    const existingKeys = readKeys();
    
    // Generate new keys
    const newKeys = [];
    const now = Date.now();
    const expirationTime = now + (keyDuration * 60 * 60 * 1000); // Convert hours to milliseconds

    for (let i = 0; i < keyCount; i++) {
      let newKey;
      let attempts = 0;
      
      // Ensure unique key generation
      do {
        newKey = generateKey();
        attempts++;
      } while (
        existingKeys.some(k => k.key === newKey) && 
        attempts < 50
      );

      if (attempts >= 50) {
        throw new Error('Unable to generate unique key after 50 attempts');
      }

      const keyData = {
        key: newKey,
        created_at: now,
        expires: expirationTime,
        active: true,
        usage_count: 0,
        device_id: null,
        device_bound: false,
        last_used: null,
        created_by: 'admin',
        duration_hours: keyDuration
      };

      newKeys.push(keyData);
      existingKeys.push(keyData);
    }

    // Write updated keys to storage
    const writeSuccess = writeKeys(existingKeys);
    
    if (!writeSuccess) {
      throw new Error('Failed to save keys to storage');
    }

    // Verify keys were written successfully
    const verifyKeys = readKeys();
    const allNewKeysPresent = newKeys.every(newKey => 
      verifyKeys.some(savedKey => savedKey.key === newKey.key)
    );

    if (!allNewKeysPresent) {
      throw new Error('Key verification failed - not all keys were saved');
    }

    console.log(`Successfully generated ${keyCount} keys:`, newKeys.map(k => k.key));

    return res.status(200).json({
      success: true,
      message: `Successfully generated ${keyCount} key${keyCount > 1 ? 's' : ''}`,
      count: keyCount,
      keys: newKeys.map(k => k.key), // Only return key strings for display
      duration_hours: keyDuration,
      expires_at: new Date(expirationTime).toISOString(),
      storage_verified: true,
      total_keys_in_storage: verifyKeys.length,
      timestamp: now
    });

  } catch (error) {
    console.error('Create Key Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to generate keys: ' + error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}
