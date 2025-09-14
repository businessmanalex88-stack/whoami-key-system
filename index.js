export default function handler(req, res) {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WarpahVip Key System</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #1a1a1a;
            color: white;
            padding: 20px;
            max-width: 1000px;
            margin: 0 auto;
        }
        .header {
            text-align: center;
            background: rgba(0, 255, 127, 0.1);
            padding: 30px;
            border-radius: 15px;
            margin-bottom: 30px;
        }
        .header h1 {
            color: #00ff7f;
            font-size: 3em;
            margin-bottom: 10px;
        }
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
        }
        .card {
            background: rgba(30, 30, 30, 0.9);
            padding: 25px;
            border-radius: 12px;
            border: 1px solid rgba(0, 255, 127, 0.2);
        }
        .card h3 {
            color: #00ff7f;
            margin-bottom: 15px;
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
        }
        .input {
            width: 100%;
            padding: 12px;
            margin: 8px 0;
            background: rgba(40, 40, 40, 0.8);
            border: 1px solid rgba(0, 255, 127, 0.3);
            border-radius: 6px;
            color: white;
        }
        .result {
            background: rgba(15, 15, 15, 0.9);
            padding: 15px;
            border-radius: 8px;
            margin-top: 15px;
            font-family: monospace;
            font-size: 12px;
            max-height: 200px;
            overflow-y: auto;
        }
        .status {
            background: rgba(20, 20, 20, 0.9);
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🔐 WarpahVip Key System</h1>
        <p>Professional Delta Executor Key Management</p>
    </div>

    <div class="status">
        <h3>📊 System Status</h3>
        <div id="systemStatus">Loading system information...</div>
    </div>

    <div class="grid">
        <div class="card">
            <h3>🔑 Generate Keys</h3>
            <input type="password" class="input" id="adminPass" placeholder="Admin Password" value="Whoamidev1819">
            <input type="number" class="input" id="keyCount" placeholder="Count" value="3" min="1" max="10">
            <button class="btn" onclick="generateKeys()">Generate Keys</button>
            <div id="generateResult" class="result">Ready to generate keys...</div>
        </div>

        <div class="card">
            <h3>📋 View All Keys</h3>
            <button class="btn" onclick="loadAllKeys()">Load All Keys</button>
            <button class="btn" onclick="refreshSystem()">🔄 Refresh System</button>
            <div id="keysResult" class="result">Click to load keys...</div>
        </div>

        <div class="card">
            <h3>✅ Test Key Validation</h3>
            <input type="text" class="input" id="testKey" placeholder="Enter key (try: WARPAH_TEST001)">
            <input type="text" class="input" id="testUser" placeholder="User ID" value="testuser123">
            <button class="btn" onclick="validateKey()">Validate Key</button>
            <div id="validateResult" class="result">Enter key to test...</div>
        </div>

        <div class="card">
            <h3>🔧 API Testing</h3>
            <button class="btn" onclick="testConnection()">Test API Connection</button>
            <button class="btn" onclick="testAllEndpoints()">Test All Endpoints</button>
            <div id="apiResult" class="result">API testing results...</div>
        </div>
    </div>

    <div style="margin-top: 30px; text-align: center; color: #666;">
        <p>API Base: <strong style="color: #00ff7f;">/api</strong></p>
        <p>Test Keys: WARPAH_TEST001, WARPAH_TEST002</p>
    </div>

    <script>
        const API_BASE = '/api';

        // Auto-load system info on page load
        window.onload = function() {
            testConnection();
            loadSystemInfo();
        };

        async function testConnection() {
            document.getElementById('apiResult').textContent = 'Testing API connection...';
            
            try {
                const response = await fetch(API_BASE + '/test');
                const data = await response.json();
                
                if (data.success) {
                    document.getElementById('apiResult').textContent = '✅ API Connection: SUCCESS';
                    document.getElementById('apiResult').style.color = '#00ff7f';
                } else {
                    throw new Error('API returned error');
                }
            } catch (error) {
                document.getElementById('apiResult').textContent = '❌ API Connection: FAILED - ' + error.message;
                document.getElementById('apiResult').style.color = '#ff6666';
            }
        }

        async function loadSystemInfo() {
            try {
                const response = await fetch(API_BASE + '/admin?password=Whoamidev1819');
                const data = await response.json();
                
                if (data.success) {
                    document.getElementById('systemStatus').innerHTML = \`
                        <strong style="color: #00ff7f;">System: Online</strong><br>
                        Total Keys: \${data.total}<br>
                        Active Keys: \${data.active}<br>
                        Last Update: \${new Date().toLocaleString()}
                    \`;
                } else {
                    document.getElementById('systemStatus').textContent = '❌ Failed to load system info';
                }
            } catch (error) {
                document.getElementById('systemStatus').textContent = '❌ System Error: ' + error.message;
            }
        }

        async function generateKeys() {
            const password = document.getElementById('adminPass').value;
            const count = parseInt(document.getElementById('keyCount').value) || 1;
            
            document.getElementById('generateResult').textContent = 'Generating keys...';
            document.getElementById('generateResult').style.color = '#ffaa00';
            
            try {
                const response = await fetch(API_BASE + '/create-key', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ password, count })
                });
                
                const data = await response.json();
                
                if (data.success) {
                    let result = \`✅ Generated \${data.count} keys:\\n\\n\`;
                    data.keys.forEach(key => result += key + '\\n');
                    document.getElementById('generateResult').textContent = result;
                    document.getElementById('generateResult').style.color = '#00ff7f';
                    
                    // Auto refresh system info
                    setTimeout(loadSystemInfo, 1000);
                } else {
                    document.getElementById('generateResult').textContent = '❌ Error: ' + (data.error || 'Generation failed');
                    document.getElementById('generateResult').style.color = '#ff6666';
                }
            } catch (error) {
                document.getElementById('generateResult').textContent = '❌ Network Error: ' + error.message;
                document.getElementById('generateResult').style.color = '#ff6666';
            }
        }

        async function loadAllKeys() {
            document.getElementById('keysResult').textContent = 'Loading all keys...';
            document.getElementById('keysResult').style.color = '#ffaa00';
            
            try {
                const response = await fetch(API_BASE + '/admin?password=Whoamidev1819');
                const data = await response.json();
                
                if (data.success) {
                    let result = \`📊 Total: \${data.total} keys | Active: \${data.active}\\n\\n\`;
                    
                    if (data.keys.length === 0) {
                        result += 'No keys found. Generate some keys first.';
                    } else {
                        data.keys.forEach(key => {
                            const isActive = key.active && Date.now() < key.expires;
                            const status = isActive ? '✅ ACTIVE' : '❌ EXPIRED';
                            const bound = key.device_id ? '🔒 BOUND' : '🔓 UNBOUND';
                            
                            result += \`🔑 \${key.key}\\n\`;
                            result += \`   \${status} | \${bound} | Used: \${key.usage_count}x\\n\\n\`;
                        });
                    }
                    
                    document.getElementById('keysResult').textContent = result;
                    document.getElementById('keysResult').style.color = '#00ff7f';
                } else {
                    document.getElementById('keysResult').textContent = '❌ Error: ' + (data.error || 'Failed to load keys');
                    document.getElementById('keysResult').style.color = '#ff6666';
                }
            } catch (error) {
                document.getElementById('keysResult').textContent = '❌ Network Error: ' + error.message;
                document.getElementById('keysResult').style.color = '#ff6666';
            }
        }

        async function validateKey() {
            const key = document.getElementById('testKey').value.trim();
            const user_id = document.getElementById('testUser').value.trim();
            
            if (!key) {
                document.getElementById('validateResult').textContent = '⚠️ Please enter a key to validate';
                document.getElementById('validateResult').style.color = '#ffaa00';
                return;
            }
            
            document.getElementById('validateResult').textContent = 'Validating key...';
            document.getElementById('validateResult').style.color = '#ffaa00';
            
            try {
                const response = await fetch(API_BASE + '/validate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        key: key,
                        user_id: user_id || 'testuser',
                        device_info: { id: 'browser_test', model: 'Browser', brand: 'Test' }
                    })
                });
                
                const data = await response.json();
                
                if (data.success) {
                    const result = \`✅ KEY VALID!\\n\\nKey: \${data.keyData.key}\\nUsage Count: \${data.keyData.usage_count}\\nDevice Bound: \${data.keyData.device_bound ? 'Yes' : 'No'}\`;
                    document.getElementById('validateResult').textContent = result;
                    document.getElementById('validateResult').style.color = '#00ff7f';
                } else {
                    document.getElementById('validateResult').textContent = \`❌ VALIDATION FAILED\\n\\nReason: \${data.reason}\`;
                    document.getElementById('validateResult').style.color = '#ff6666';
                }
            } catch (error) {
                document.getElementById('validateResult').textContent = '❌ Network Error: ' + error.message;
                document.getElementById('validateResult').style.color = '#ff6666';
            }
        }

        async function testAllEndpoints() {
            document.getElementById('apiResult').textContent = 'Testing all endpoints...';
            document.getElementById('apiResult').style.color = '#ffaa00';
            
            const endpoints = [
                { name: 'GET /api/test', url: '/api/test' },
                { name: 'GET /api/admin', url: '/api/admin?password=Whoamidev1819' },
                { name: 'POST /api/validate', url: '/api/validate', method: 'POST', body: { key: 'WARPAH_TEST001', user_id: 'test', device_info: { id: 'test' }} }
            ];
            
            let result = 'Endpoint Test Results:\\n\\n';
            
            for (const endpoint of endpoints) {
                try {
                    const options = endpoint.method === 'POST' ? {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(endpoint.body)
                    } : {};
                    
                    const response = await fetch(endpoint.url, options);
                    const status = response.ok ? '✅' : '❌';
                    result += \`\${status} \${endpoint.name} - Status: \${response.status}\\n\`;
                } catch (error) {
                    result += \`❌ \${endpoint.name} - Error: \${error.message}\\n\`;
                }
            }
            
            document.getElementById('apiResult').textContent = result;
            document.getElementById('apiResult').style.color = '#00ff7f';
        }

        function refreshSystem() {
            loadSystemInfo();
            loadAllKeys();
        }

        // Auto-refresh system info every 30 seconds
        setInterval(loadSystemInfo, 30000);
    </script>
</body>
</html>
  `;
  
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(html);
}
