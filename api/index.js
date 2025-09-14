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
            max-height: 200px;
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
                <div id="apiResult" class="result">API testing and debugging tools...</div>
            </div>
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

        // Initialize system on page load
        window.onload = function() {
            updateStatus('🔄 Initializing system...');
            setTimeout(() => {
                testConnection();
                loadSystemInfo();
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

        async function makeRequest(url, options = {}) {
            try {
                const response = await fetch(url, {
                    ...options,
                    headers: {
                        'Content-Type': 'application/json',
                        ...options.headers
                    }
                });

                if (!response.ok) {
                    throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
                }

                const contentType = response.headers.get('content-type');
                if (!contentType || !contentType.includes('application/json')) {
                    const text = await response.text();
                    throw new Error(\`Non-JSON response received: \${text.substring(0, 100)}...\`);
                }

                return await response.json();
            } catch (error) {
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
                const data = await makeRequest(API_BASE + '/admin?password=Whoamidev1819');
                
                if (data.success) {
                    systemData = data;
                    const info = \`📊 System Status: Online
🔑 Total Keys: \${data.total || 0}
✅ Active Keys: \${data.active || 0}
🕐 Last Updated: \${new Date().toLocaleString()}
🌐 Server Time: \${data.timestamp ? new Date(data.timestamp).toLocaleString() : 'N/A'}\`;
                    
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
            
            updateResult('generateResult', \`🔄 Generating \${count} keys...\`, 'loading');
            
            try {
                const data = await makeRequest(API_BASE + '/create-key', {
                    method: 'POST',
                    body: JSON.stringify({ password, count })
                });
                
                if (data.success) {
                    let result = \`✅ Successfully generated \${data.count || data.keys.length} keys:\\n\\n\`;
                    if (data.keys && Array.isArray(data.keys)) {
                        data.keys.forEach((key, index) => {
                            result += \`\${index + 1}. \${key}\\n\`;
                        });
                    }
                    result += \`\\n🔄 Auto-refreshing system info...\`;
                    
                    updateResult('generateResult', result, 'success');
                    
                    // Auto-refresh system info and keys list
                    setTimeout(() => {
                        loadSystemInfo();
                        loadAllKeys();
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
                const data = await makeRequest(API_BASE + \`/admin?password=\${encodeURIComponent(password)}\`);
                
                if (data.success) {
                    let result = \`📊 Key Statistics:\\nTotal: \${data.total || 0} keys | Active: \${data.active || 0} keys\\n\\n\`;
                    
                    if (!data.keys || data.keys.length === 0) {
                        result += '📝 No keys found.\\n\\nUse the "Generate Keys" section to create new keys.';
                    } else {
                        result += '📋 Key Details:\\n\\n';
                        
                        data.keys.forEach((key, index) => {
                            const isActive = key.active && Date.now() < key.expires;
                            const status = isActive ? '✅ ACTIVE' : '❌ EXPIRED';
                            const bound = key.device_id ? '🔒 BOUND' : '🔓 UNBOUND';
                            const expireDate = new Date(key.expires).toLocaleDateString();
                            
                            result += \`\${index + 1}. \${key.key}\\n\`;
                            result += \`   Status: \${status} | Device: \${bound}\\n\`;
                            result += \`   Usage: \${key.usage_count || 0}x | Expires: \${expireDate}\\n\\n\`;
                        });
                    }
                    
                    updateResult('keysResult', result, 'success');
                } else {
                    updateResult('keysResult', '❌ Failed to Load Keys\\n\\nError: ' + (data.error || 'Access denied'), 'error');
                }
            } catch (error) {
                updateResult('keysResult', '❌ Network Error\\n\\nError: ' + error.message + '\\n\\nMake sure your /api/admin.js file exists and returns proper JSON.', 'error');
            }
        }

        async function validateKey() {
            const key = document.getElementById('testKey').value.trim();
            const user_id = document.getElementById('testUser').value.trim();
            
            if (!key) {
                updateResult('validateResult', '⚠️ Please enter a key to validate', 'error');
                return;
            }
            
            updateResult('validateResult', \`🔄 Validating key: \${key}...\`, 'loading');
            
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
                    const result = \`✅ KEY VALIDATION: SUCCESS\\n\\n\` +
                        \`🔑 Key: \${data.keyData.key}\\n\` +
                        \`📊 Usage Count: \${data.keyData.usage_count || 0}\\n\` +
                        \`🔒 Device Bound: \${data.keyData.device_bound ? 'Yes' : 'No'}\\n\` +
                        \`⏰ Expires: \${new Date(data.keyData.expires).toLocaleDateString()}\\n\\n\` +
                        \`✅ This key is valid and ready to use!\`;
                    
                    updateResult('validateResult', result, 'success');
                } else {
                    const result = \`❌ KEY VALIDATION: FAILED\\n\\n\` +
                        \`🔑 Key: \${key}\\n\` +
                        \`❌ Reason: \${data.reason || 'Unknown error'}\\n\\n\` +
                        \`💡 Tips:\\n\` +
                        \`• Check if key is typed correctly\\n\` +
                        \`• Ensure key hasn't expired\\n\` +
                        \`• Key might be bound to another device\`;
                    
                    updateResult('validateResult', result, 'error');
                }
            } catch (error) {
                updateResult('validateResult', '❌ Network Error\\n\\nUnable to validate key: ' + error.message + '\\n\\nMake sure your /api/validate.js file exists.', 'error');
            }
        }

        async function testAllEndpoints() {
            updateResult('apiResult', '🧪 Testing all API endpoints...', 'loading');
            
            const endpoints = [
                {
                    name: 'GET /api/test',
                    method: 'GET',
                    url: '/api/test',
                    description: 'Basic connectivity test'
                },
                {
                    name: 'GET /api/admin',
                    method: 'GET',
                    url: '/api/admin?password=Whoamidev1819',
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
                    
                    await makeRequest(endpoint.url, options);
                    result += \`✅ \${endpoint.name}\\n\`;
                    result += \`   Status: OK | \${endpoint.description}\\n\\n\`;
                    
                } catch (error) {
                    result += \`❌ \${endpoint.name}\\n\`;
                    result += \`   Error: \${error.message}\\n\\n\`;
                }
            }
            
            result += '🔄 Test completed. All green checkmarks indicate working endpoints.';
            updateResult('apiResult', result, result.includes('❌') ? 'error' : 'success');
        }

        function refreshSystem() {
            updateStatus('🔄 Refreshing system...');
            loadSystemInfo();
            testConnection();
        }

        function updateResult(elementId, text, type) {
            const element = document.getElementById(elementId);
            element.textContent = text;
            element.className = \`result \${type}\`;
        }

        // Auto-refresh system info every 60 seconds
        setInterval(() => {
            if (systemData) {
                loadSystemInfo();
            }
        }, 60000);
    </script>
</body>
</html>`;

  return res.status(200).send(html);
}
