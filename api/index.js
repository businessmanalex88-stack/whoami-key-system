export default function handler(req, res) {
  // Set headers untuk HTML
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WarpahVip Key System</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
            color: white;
            min-height: 100vh;
            padding: 20px;
        }
        .container { max-width: 1000px; margin: 0 auto; }
        .header {
            text-align: center;
            margin-bottom: 40px;
            padding: 30px;
            background: rgba(0, 255, 127, 0.1);
            border-radius: 15px;
            border: 1px solid rgba(0, 255, 127, 0.3);
        }
        .header h1 {
            font-size: 3em;
            color: #00ff7f;
            margin-bottom: 10px;
            text-shadow: 0 0 20px rgba(0, 255, 127, 0.5);
        }
        .header p {
            color: #b0ffb0;
            font-size: 1.2em;
        }
        .status-card {
            background: rgba(20, 20, 20, 0.9);
            padding: 25px;
            border-radius: 12px;
            margin-bottom: 25px;
            border: 1px solid rgba(0, 255, 127, 0.2);
        }
        .status-card h3 {
            color: #00ff7f;
            margin-bottom: 15px;
            font-size: 1.3em;
        }
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        .card {
            background: rgba(30, 30, 30, 0.9);
            padding: 25px;
            border-radius: 12px;
            border: 1px solid rgba(0, 255, 127, 0.2);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0, 255, 127, 0.1);
        }
        .card h3 {
            color: #00ff7f;
            margin-bottom: 15px;
            font-size: 1.2em;
        }
        .btn {
            background: linear-gradient(45deg, #00ff7f, #00cc66);
            color: black;
            border: none;
            padding: 12px 20px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: bold;
            width: 100%;
            margin: 5px 0;
            transition: all 0.3s ease;
            font-size: 14px;
        }
        .btn:hover {
            background: linear-gradient(45deg, #00cc66, #009955);
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 255, 127, 0.3);
        }
        .btn-secondary {
            background: linear-gradient(45deg, #007acc, #005999);
        }
        .btn-secondary:hover {
            background: linear-gradient(45deg, #005999, #004477);
        }
        .btn-danger {
            background: linear-gradient(45deg, #ff4444, #cc3333);
        }
        .btn-danger:hover {
            background: linear-gradient(45deg, #cc3333, #992222);
        }
        .input {
            width: 100%;
            padding: 12px;
            margin: 8px 0;
            background: rgba(40, 40, 40, 0.8);
            border: 1px solid rgba(0, 255, 127, 0.3);
            border-radius: 6px;
            color: white;
            font-size: 14px;
        }
        .input:focus {
            outline: none;
            border-color: #00ff7f;
            box-shadow: 0 0 10px rgba(0, 255, 127, 0.2);
        }
        .input::placeholder {
            color: #888;
        }
        .result {
            background: rgba(15, 15, 15, 0.9);
            padding: 15px;
            border-radius: 8px;
            margin-top: 15px;
            font-family: 'Courier New', monospace;
            font-size: 12px;
            max-height: 300px;
            overflow-y: auto;
            border: 1px solid rgba(0, 255, 127, 0.1);
            white-space: pre-wrap;
        }
        .success { color: #00ff7f; }
        .error { color: #ff6666; }
        .loading { color: #ffaa00; }
        .info-section {
            margin-top: 40px;
            padding: 25px;
            background: rgba(20, 20, 20, 0.5);
            border-radius: 12px;
            text-align: center;
            border: 1px solid rgba(0, 255, 127, 0.1);
        }
        .info-section h3 {
            color: #00ff7f;
            margin-bottom: 15px;
        }
        .info-section code {
            background: rgba(0, 255, 127, 0.1);
            color: #00ff7f;
            padding: 4px 8px;
            border-radius: 4px;
            font-family: monospace;
        }
        .api-status {
            display: inline-block;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: bold;
            margin: 10px 0;
        }
        .status-online {
            background: #00ff7f;
            color: black;
        }
        .status-offline {
            background: #ff6666;
            color: white;
        }
        .status-checking {
            background: #ffaa00;
            color: black;
        }
        .debug-section {
            margin-top: 20px;
            padding: 15px;
            background: rgba(40, 40, 40, 0.5);
            border-radius: 8px;
            border: 1px solid rgba(255, 255, 0, 0.2);
        }
        .debug-section h4 {
            color: #ffaa00;
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔐 WarpahVip Key System</h1>
            <p>Professional Delta Executor Key Management System</p>
            <div id="apiStatus" class="api-status status-checking">🔄 Checking API Status...</div>
        </div>

        <div class="status-card">
            <h3>📊 System Dashboard</h3>
            <div id="systemInfo">Loading system information...</div>
        </div>

        <div class="grid">
            <div class="card">
                <h3>🔑 Generate New Keys</h3>
                <p style="color: #888; font-size: 13px; margin-bottom: 15px;">Create new license keys with custom duration</p>
                <input type="password" class="input" id="adminPass" placeholder="Admin Password" value="Whoamidev1819">
                <input type="number" class="input" id="keyCount" placeholder="Number of keys (1-10)" value="3" min="1" max="10">
                <button class="btn" onclick="generateKeys()">🔑 Generate Keys</button>
                <div id="generateResult" class="result">Ready to generate new keys...</div>
            </div>

            <div class="card">
                <h3>📋 Key Management</h3>
                <p style="color: #888; font-size: 13px; margin-bottom: 15px;">View and manage all existing keys</p>
                <button class="btn" onclick="loadAllKeys()">📋 Load All Keys</button>
                <button class="btn btn-secondary" onclick="refreshSystem()">🔄 Refresh System</button>
                <button class="btn btn-danger" onclick="clearAllKeys()">🗑️ Clear All Keys</button>
                <div id="keysResult" class="result">Click 'Load All Keys' to view...</div>
            </div>

            <div class="card">
                <h3>✅ Key Validation Test</h3>
                <p style="color: #888; font-size: 13px; margin-bottom: 15px;">Test key validation and device binding</p>
                <input type="text" class="input" id="testKey" placeholder="Enter key to test (e.g., WARPAH_TEST001)">
                <input type="text" class="input" id="testUser" placeholder="Test User ID" value="testuser123">
                <button class="btn" onclick="validateKey()">✅ Validate Key</button>
                <div id="validateResult" class="result">Enter a key above to test validation...</div>
            </div>

            <div class="card">
                <h3>🔧 API Testing & Debug</h3>
                <p style="color: #888; font-size: 13px; margin-bottom: 15px;">Test all API endpoints and connections</p>
                <button class="btn" onclick="testConnection()">🔌 Test Connection</button>
                <button class="btn btn-secondary" onclick="testAllEndpoints()">🧪 Test All Endpoints</button>
                <button class="btn btn-secondary" onclick="debugStorage()">🐛 Debug Storage</button>
                <div id="apiResult" class="result">API testing and debugging tools...</div>
            </div>
        </div>

        <div class="debug-section">
            <h4>🐛 Synchronization Debug</h4>
            <div id="debugInfo">Debug information will appear here...</div>
        </div>

        <div class="info-section">
            <h3>🎮 Integration Information</h3>
            <p><strong>API Base URL:</strong> <code>${req.headers.host}/api</code></p>
            <p><strong>Test Keys Available:</strong> WARPAH_TEST001, WARPAH_TEST002</p>
            <p><strong>Admin Password:</strong> Whoamidev1819</p>
            <p style="margin-top: 15px; color: #888; font-size: 13px;">
                This system provides 1-user-1-device key validation for Delta Executor.<br>
                Keys automatically bind to the first device that uses them.
            </p>
        </div>
    </div>

    <script>
        const API_BASE = '/api';
        let systemData = null;
        let lastGeneratedKeys = [];

        // Initialize system on page load
        window.onload = function() {
            updateStatus('🔄 Initializing system...');
            setTimeout(() => {
                testConnection();
                loadSystemInfo();
                debugStorage();
            }, 500);
        };

        function updateStatus(message) {
            const statusEl = document.getElementById('apiStatus');
            statusEl.textContent = message;
            
            if (message.includes('Online') || message.includes('SUCCESS')) {
                statusEl.className = 'api-status status-online';
            } else if (message.includes('Failed') || message.includes('ERROR')) {
                statusEl.className = 'api-status status-offline';
            } else {
                statusEl.className = 'api-status status-checking';
            }
        }

        function updateDebugInfo(message) {
            const debugEl = document.getElementById('debugInfo');
            const timestamp = new Date().toLocaleTimeString();
            debugEl.textContent = `[${timestamp}] ${message}`;
        }

        async function makeRequest(url, options = {}) {
            try {
                updateDebugInfo(`Making request to: ${url}`);
                
                const response = await fetch(url, {
                    ...options,
                    headers: {
                        'Content-Type': 'application/json',
                        'Cache-Control': 'no-cache',
                        ...options.headers
                    }
                });

                updateDebugInfo(`Response status: ${response.status} ${response.statusText}`);

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }

                const contentType = response.headers.get('content-type');
                if (!contentType || !contentType.includes('application/json')) {
                    const text = await response.text();
                    updateDebugInfo(`Non-JSON response received: ${text.substring(0, 50)}...`);
                    throw new Error(`Non-JSON response received: ${text.substring(0, 100)}...`);
                }

                const data = await response.json();
                updateDebugInfo(`Request successful, got data with ${Object.keys(data).length} properties`);
                return data;
            } catch (error) {
                updateDebugInfo(`Request failed: ${error.message}`);
                console.error('Request failed:', error);
                throw error;
            }
        }

        async function testConnection() {
            updateResult('apiResult', '🔄 Testing API connection...', 'loading');
            
            try {
                const data = await makeRequest(API_BASE + '/test');
                
                if (data.success) {
                    updateStatus('🟢 API Online');
                    updateResult('apiResult', '✅ API Connection: SUCCESS\\n\\n' + JSON.stringify(data, null, 2), 'success');
                } else {
                    throw new Error('API returned non-success response');
                }
            } catch (error) {
                updateStatus('🔴 API Offline - ' + error.message);
                updateResult('apiResult', '❌ API Connection: FAILED\\n\\nError: ' + error.message + '\\n\\nPlease check if your API endpoints are properly configured.', 'error');
            }
        }

        async function loadSystemInfo() {
            try {
                const data = await makeRequest(API_BASE + '/admin?password=Whoamidev1819&_t=' + Date.now());
                
                if (data.success) {
                    systemData = data;
                    const info = `📊 System Status: Online
🔑 Total Keys: ${data.total || 0}
✅ Active Keys: ${data.active || 0}
🕐 Last Updated: ${new Date().toLocaleString()}
🌐 Server Time: ${data.timestamp ? new Date(data.timestamp).toLocaleString() : 'N/A'}
📝 Storage Type: ${data.storage_type || 'Unknown'}`;
                    
                    document.getElementById('systemInfo').textContent = info;
                } else {
                    document.getElementById('systemInfo').textContent = '❌ API Error: ' + (data.error || 'Unknown error');
                }
            } catch (error) {
                console.error('System Info Error:', error);
                document.getElementById('systemInfo').textContent = '❌ System Error: ' + error.message + '\\n\\nMake sure your /api/admin.js file exists and returns proper JSON response.';
            }
        }

        async function generateKeys() {
            const password = document.getElementById('adminPass').value.trim();
            const count = parseInt(document.getElementById('keyCount').value) || 1;
            
            if (!password) {
                updateResult('generateResult', '⚠️ Please enter admin password', 'error');
                return;
            }
            
            if (count < 1 || count > 10) {
                updateResult('generateResult', '⚠️ Key count must be between 1-10', 'error');
                return;
            }
            
            updateResult('generateResult', `🔄 Generating ${count} keys...`, 'loading');
            
            try {
                const data = await makeRequest(API_BASE + '/create-key', {
                    method: 'POST',
                    body: JSON.stringify({ 
                        password, 
                        count,
                        timestamp: Date.now() // Add timestamp for cache busting
                    })
                });
                
                if (data.success) {
                    lastGeneratedKeys = data.keys || [];
                    let result = `✅ Successfully generated ${data.count || data.keys.length} keys:\\n\\n`;
                    if (data.keys && Array.isArray(data.keys)) {
                        data.keys.forEach((key, index) => {
                            result += `${index + 1}. ${key}\\n`;
                        });
                    }
                    result += `\\n🔄 Auto-refreshing system info...`;
                    
                    updateResult('generateResult', result, 'success');
                    updateDebugInfo(`Generated ${data.keys.length} keys: ${JSON.stringify(data.keys)}`);
                    
                    // Force refresh with delay to ensure backend synchronization
                    setTimeout(() => {
                        updateResult('generateResult', result + '\\n🔄 Refreshing key management...', 'loading');
                        loadSystemInfo();
                    }, 1000);
                    
                    setTimeout(() => {
                        loadAllKeys();
                        updateResult('generateResult', result + '\\n✅ System synchronized!', 'success');
                    }, 2000);
                } else {
                    updateResult('generateResult', '❌ Generation Failed\\n\\nError: ' + (data.error || 'Unknown error'), 'error');
                }
            } catch (error) {
                updateResult('generateResult', '❌ Network Error\\n\\nError: ' + error.message + '\\n\\nMake sure your /api/create-key.js file exists.', 'error');
            }
        }

        async function loadAllKeys() {
            const password = document.getElementById('adminPass').value.trim();
            
            if (!password) {
                updateResult('keysResult', '⚠️ Please enter admin password', 'error');
                return;
            }
            
            updateResult('keysResult', '🔄 Loading all keys...', 'loading');
            
            try {
                // Add cache busting parameter
                const data = await makeRequest(API_BASE + `/admin?password=${encodeURIComponent(password)}&_t=${Date.now()}&force_refresh=true`);
                
                if (data.success) {
                    let result = `📊 Key Statistics:\\nTotal: ${data.total || 0} keys | Active: ${data.active || 0} keys\\n\\n`;
                    
                    // Show recently generated keys if available
                    if (lastGeneratedKeys.length > 0) {
                        result += `🆕 Recently Generated Keys:\\n`;
                        lastGeneratedKeys.forEach((key, index) => {
                            result += `${index + 1}. ${key}\\n`;
                        });
                        result += `\\n`;
                    }
                    
                    if (!data.keys || data.keys.length === 0) {
                        result += '📝 No keys found in storage.\\n\\n';
                        if (lastGeneratedKeys.length > 0) {
                            result += '⚠️ SYNC ISSUE DETECTED:\\nKeys were generated but not found in key management.\\nThis indicates a storage synchronization problem.\\n\\n';
                            result += '🛠️ Troubleshooting steps:\\n';
                            result += '1. Check if create-key.js and admin.js use same storage\\n';
                            result += '2. Verify storage persistence (database/file)\\n';
                            result += '3. Check for any caching issues\\n';
                        } else {
                            result += 'Use the "Generate Keys" section to create new keys.';
                        }
                    } else {
                        result += '📋 Key Details:\\n\\n';
                        
                        data.keys.forEach((key, index) => {
                            const isActive = key.active && Date.now() < key.expires;
                            const status = isActive ? '✅ ACTIVE' : '❌ EXPIRED';
                            const bound = key.device_id ? '🔒 BOUND' : '🔓 UNBOUND';
                            const expireDate = new Date(key.expires).toLocaleDateString();
                            
                            result += `${index + 1}. ${key.key}\\n`;
                            result += `   Status: ${status} | Device: ${bound}\\n`;
                            result += `   Usage: ${key.usage_count || 0}x | Expires: ${expireDate}\\n`;
                            result += `   Created: ${key.created_at ? new Date(key.created_at).toLocaleString() : 'Unknown'}\\n\\n`;
                        });
                        
                        // Check if recently generated keys are in the list
                        if (lastGeneratedKeys.length > 0) {
                            const foundKeys = lastGeneratedKeys.filter(genKey => 
                                data.keys.some(key => key.key === genKey)
                            );
                            
                            if (foundKeys.length === lastGeneratedKeys.length) {
                                result += '✅ All recently generated keys are synchronized!';
                            } else {
                                result += `⚠️ SYNC WARNING: Only ${foundKeys.length}/${lastGeneratedKeys.length} recently generated keys found in storage.`;
                            }
                        }
                    }
                    
                    updateResult('keysResult', result, data.keys && data.keys.length > 0 ? 'success' : 'error');
                    updateDebugInfo(`Loaded ${data.keys ? data.keys.length : 0} keys from storage`);
                } else {
                    updateResult('keysResult', '❌ Failed to Load Keys\\n\\nError: ' + (data.error || 'Access denied'), 'error');
                }
            } catch (error) {
                updateResult('keysResult', '❌ Network Error\\n\\nError: ' + error.message + '\\n\\nMake sure your /api/admin.js file exists and returns proper JSON.', 'error');
            }
        }

        async function clearAllKeys() {
            if (!confirm('⚠️ Are you sure you want to delete ALL keys? This action cannot be undone!')) {
                return;
            }
            
            const password = document.getElementById('adminPass').value.trim();
            if (!password) {
                updateResult('keysResult', '⚠️ Please enter admin password', 'error');
                return;
            }
            
            updateResult('keysResult', '🔄 Clearing all keys...', 'loading');
            
            try {
                const data = await makeRequest(API_BASE + '/admin', {
                    method: 'POST',
                    body: JSON.stringify({
                        password: password,
                        action: 'clear_all_keys'
                    })
                });
                
                if (data.success) {
                    lastGeneratedKeys = [];
                    updateResult('keysResult', '✅ All keys cleared successfully!\\n\\nStorage has been reset.', 'success');
                    loadSystemInfo(); // Refresh system info
                } else {
                    updateResult('keysResult', '❌ Failed to clear keys\\n\\nError: ' + (data.error || 'Unknown error'), 'error');
                }
            } catch (error) {
                updateResult('keysResult', '❌ Network Error\\n\\nError: ' + error.message, 'error');
            }
        }

        async function validateKey() {
            const key = document.getElementById('testKey').value.trim();
            const user_id = document.getElementById('testUser').value.trim();
            
            if (!key) {
                updateResult('validateResult', '⚠️ Please enter a key to validate', 'error');
                return;
            }
            
            updateResult('validateResult', `🔄 Validating key: ${key}...`, 'loading');
            
            try {
                const data = await makeRequest(API_BASE + '/validate', {
                    method: 'POST',
                    body: JSON.stringify({
                        key: key,
                        user_id: user_id || 'testuser',
                        device_info: { 
                            id: 'browser_test_' + Date.now(), 
                            model: 'Browser Test', 
                            brand: 'Test Device' 
                        }
                    })
                });
                
                if (data.success) {
                    const result = `✅ KEY VALIDATION: SUCCESS\\n\\n` +
                        `🔑 Key: ${data.keyData.key}\\n` +
                        `📊 Usage Count: ${data.keyData.usage_count || 0}\\n` +
                        `🔒 Device Bound: ${data.keyData.device_bound ? 'Yes' : 'No'}\\n` +
                        `⏰ Expires: ${new Date(data.keyData.expires).toLocaleDateString()}\\n\\n` +
                        `✅ This key is valid and ready to use!`;
                    
                    updateResult('validateResult', result, 'success');
                } else {
                    const result = `❌ KEY VALIDATION: FAILED\\n\\n` +
                        `🔑 Key: ${key}\\n` +
                        `❌ Reason: ${data.reason || 'Unknown error'}\\n\\n` +
                        `💡 Tips:\\n` +
                        `• Check if key is typed correctly\\n` +
                        `• Ensure key hasn't expired\\n` +
                        `• Key might be bound to another device`;
                    
                    updateResult('validateResult', result, 'error');
                }
            } catch (error) {
                updateResult('validateResult', '❌ Network Error\\n\\nUnable to validate key: ' + error.message + '\\n\\nMake sure your /api/validate.js file exists.', 'error');
            }
        }

        async function debugStorage() {
            updateDebugInfo('Running storage debug check...');
            
            try {
                // Test both endpoints to compare data
                const adminData = await makeRequest(API_BASE + '/admin?password=Whoamidev1819&_t=' + Date.now());
                const testData = await makeRequest(API_BASE + '/test?_t=' + Date.now());
                
                let debugResult = '🐛 STORAGE DEBUG REPORT\\n\\n';
                debugResult += `Admin Endpoint Response: ${adminData.success ? 'OK' : 'FAILED'}\\n`;
                debugResult += `Test Endpoint Response: ${testData.success ? 'OK' : 'FAILED'}\\n\\n`;
                
                if (adminData.success) {
                    debugResult += `Keys in admin storage: ${adminData.total || 0}\\n`;
                    debugResult += `Active keys: ${adminData.active || 0}\\n`;
                    debugResult += `Storage type: ${adminData.storage_type || 'Unknown'}\\n`;
                    debugResult += `Data keys available: ${adminData.keys ? adminData.keys.length : 0}\\n\\n`;
                }
                
                if (lastGeneratedKeys.length > 0) {
                    debugResult += `Recently generated keys: ${lastGeneratedKeys.length}\\n`;
                    debugResult += `Generated keys: ${JSON.stringify(lastGeneratedKeys)}\\n\\n`;
                }
                
                debugResult += 'Synchronization status: ' + 
                    (adminData.success && adminData.keys && adminData.keys.length > 0 ? 
                        'GOOD - Keys found in storage' : 
                        'ISSUE - No keys or storage problems');
                
                updateResult('apiResult', debugResult, adminData.success ? 'success' : 'error');
                
            } catch (error) {
                updateResult('apiResult', '❌ Debug Error: ' + error.message, 'error');
            }
        }

        async function testAllEndpoints() {
            updateResult('apiResult', '🧪 Testing all API endpoints...', 'loading');
            
            const endpoints = [
                {
                    name: 'GET /api/test',
                    method: 'GET',
                    url: '/api/test?_t=' + Date.now(),
                    description: 'Basic connectivity test'
                },
                {
                    name: 'GET /api/admin',
                    method: 'GET',
                    url: '/api/admin?password=Whoamidev1819&_t=' + Date.now(),
                    description: 'Admin panel access'
                },
                {
                    name: 'POST /api/validate',
                    method: 'POST',
                    url: '/api/validate',
                    description: 'Key validation',
                    body: {
                        key: 'WARPAH_TEST001',
                        user_id: 'testuser',
                        device_info: { id: 'test_device' }
                    }
                },
                {
                    name: 'POST /api/create-key',
                    method: 'POST',
                    url: '/api/create-key',
                    description: 'Key generation',
                    body: {
                        password: 'Whoamidev1819',
                        count: 1
                    }
                }
            ];
            
            let result = '🧪 API Endpoint Test Results:\\n\\n';
            
            for (const endpoint of endpoints) {
                try {
                    const options = {
                        method: endpoint.method
                    };
                    
                    if (endpoint.body) {
                        options.body = JSON.stringify(endpoint.body);
                    }
                    
                    const data = await makeRequest(endpoint.url, options);
                    result += `✅ ${endpoint.name}\\n`;
                    result += `   Status: OK | ${endpoint.description}\\n`;
                    
                    // Show additional info for specific endpoints
                    if (endpoint.url.includes('admin') && data.total !== undefined) {
                        result += `   Keys found: ${data.total}\\n`;
                    }
                    if (endpoint.url.includes('create-key') && data.keys) {
                        result += `   Generated: ${data.keys.length} keys\\n`;
                    }
                    result += `\\n`;
                    
                } catch (error) {
                    result += `❌ ${endpoint.name}\\n`;
                    result += `   Error: ${error.message}\\n\\n`;
                }
            }
            
            result += '🔄 Test completed. All green checkmarks indicate working endpoints.';
            updateResult('apiResult', result, result.includes('❌') ? 'error' : 'success');
        }

        function refreshSystem() {
            updateStatus('🔄 Refreshing system...');
            updateDebugInfo('Manual system refresh triggered');
            loadSystemInfo();
            testConnection();
            // Clear cache and reload keys
            setTimeout(() => {
                loadAllKeys();
            }, 1000);
        }

        function updateResult(elementId, text, type) {
            const element = document.getElementById(elementId);
            element.textContent = text;
            element.className = `result ${type}`;
        }

        // Auto-refresh system info every 60 seconds
        setInterval(() => {
            if (systemData) {
                loadSystemInfo();
            }
        }, 60000);

        // Add keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            if (e.ctrlKey && e.key === 'r') {
                e.preventDefault();
                refreshSystem();
            }
        });
    </script>
</body>
</html>`;

  return res.status(200).send(html);
    }
