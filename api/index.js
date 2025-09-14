export default function handler(req, res) {
  const html = `<!DOCTYPE html>
<html>
<head>
    <title>WarpahVip Key System</title>
    <meta charset="UTF-8">
    <style>
        body { 
            font-family: Arial; 
            background: #1a1a1a; 
            color: white; 
            padding: 20px; 
            max-width: 800px; 
            margin: 0 auto; 
        }
        .header { 
            text-align: center; 
            background: rgba(0,255,127,0.1); 
            padding: 30px; 
            border-radius: 10px; 
            margin-bottom: 30px; 
        }
        .header h1 { 
            color: #00ff7f; 
            font-size: 2.5em; 
            margin-bottom: 10px; 
        }
        .card { 
            background: rgba(30,30,30,0.9); 
            padding: 20px; 
            border-radius: 10px; 
            margin: 20px 0; 
            border: 1px solid rgba(0,255,127,0.2); 
        }
        .btn { 
            background: #00ff7f; 
            color: black; 
            border: none; 
            padding: 12px 20px; 
            border-radius: 5px; 
            cursor: pointer; 
            font-weight: bold; 
            margin: 5px; 
        }
        .btn:hover { background: #00cc66; }
        .input { 
            width: 100%; 
            padding: 10px; 
            margin: 10px 0; 
            background: rgba(40,40,40,0.8); 
            border: 1px solid #555; 
            color: white; 
            border-radius: 5px; 
        }
        .result { 
            background: #333; 
            padding: 15px; 
            border-radius: 5px; 
            margin: 10px 0; 
            font-family: monospace; 
            font-size: 13px; 
            max-height: 200px; 
            overflow-y: auto; 
        }
        .success { color: #00ff7f; }
        .error { color: #ff6666; }
    </style>
</head>
<body>
    <div class="header">
        <h1>WarpahVip Key System</h1>
        <p>Sistem Manajemen Kunci Delta Executor</p>
        <div id="status">Loading...</div>
    </div>

    <div class="card">
        <h3>Generate Keys</h3>
        <input type="password" class="input" id="password" placeholder="Password Admin" value="Whoamidev1819">
        <input type="number" class="input" id="count" placeholder="Jumlah" value="3" min="1" max="10">
        <button class="btn" onclick="generateKeys()">Buat Keys</button>
        <div id="generateResult" class="result">Siap generate keys...</div>
    </div>

    <div class="card">
        <h3>View All Keys</h3>
        <button class="btn" onclick="loadKeys()">Load Keys</button>
        <div id="keysResult" class="result">Klik load keys...</div>
    </div>

    <div class="card">
        <h3>Test Key</h3>
        <input type="text" class="input" id="testKey" placeholder="Key untuk test">
        <button class="btn" onclick="testKey()">Test Key</button>
        <div id="testResult" class="result">Masukkan key untuk test...</div>
    </div>

    <script>
        window.onload = function() {
            checkAPI();
        };

        async function checkAPI() {
            try {
                const response = await fetch('/api/test');
                const data = await response.json();
                document.getElementById('status').innerHTML = 
                    data.success ? '<span style="color:#00ff7f">API Online</span>' : '<span style="color:#ff6666">API Error</span>';
            } catch (error) {
                document.getElementById('status').innerHTML = '<span style="color:#ff6666">Connection Error</span>';
            }
        }

        async function generateKeys() {
            const password = document.getElementById('password').value;
            const count = document.getElementById('count').value;
            const result = document.getElementById('generateResult');
            
            result.innerHTML = 'Generating...';
            result.className = 'result';
            
            try {
                const response = await fetch('/api/create-key', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({password, count: parseInt(count)})
                });
                
                const data = await response.json();
                
                if (data.success) {
                    let html = 'Keys berhasil dibuat:\\n\\n';
                    data.keys.forEach(key => html += key + '\\n');
                    result.textContent = html;
                    result.className = 'result success';
                } else {
                    result.textContent = 'Error: ' + data.error;
                    result.className = 'result error';
                }
            } catch (error) {
                result.textContent = 'Network error: ' + error.message;
                result.className = 'result error';
            }
        }

        async function loadKeys() {
            const password = document.getElementById('password').value;
            const result = document.getElementById('keysResult');
            
            result.innerHTML = 'Loading...';
            result.className = 'result';
            
            try {
                const response = await fetch('/api/admin?password=' + encodeURIComponent(password));
                const data = await response.json();
                
                if (data.success) {
                    let html = 'Total: ' + data.total + ' keys, Active: ' + data.active + '\\n\\n';
                    data.keys.forEach(key => {
                        const status = key.active && Date.now() < key.expires ? 'ACTIVE' : 'EXPIRED';
                        const bound = key.device_id ? 'BOUND' : 'FREE';
                        html += key.key + ' - ' + status + ' - ' + bound + ' - Used: ' + key.usage_count + 'x\\n';
                    });
                    result.textContent = html;
                    result.className = 'result success';
                } else {
                    result.textContent = 'Error: ' + data.error;
                    result.className = 'result error';
                }
            } catch (error) {
                result.textContent = 'Network error: ' + error.message;
                result.className = 'result error';
            }
        }

        async function testKey() {
            const key = document.getElementById('testKey').value;
            const result = document.getElementById('testResult');
            
            if (!key) {
                result.textContent = 'Masukkan key dulu';
                result.className = 'result error';
                return;
            }
            
            result.innerHTML = 'Testing...';
            result.className = 'result';
            
            try {
                const response = await fetch('/api/validate', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        key: key,
                        user_id: 'testuser',
                        device_info: {id: 'browser_test'}
                    })
                });
                
                const data = await response.json();
                
                if (data.success) {
                    result.textContent = 'Key VALID! Usage: ' + data.keyData.usage_count + 'x';
                    result.className = 'result success';
                } else {
                    result.textContent = 'Key INVALID: ' + data.reason;
                    result.className = 'result error';
                }
            } catch (error) {
                result.textContent = 'Network error: ' + error.message;
                result.className = 'result error';
            }
        }
    </script>
</body>
</html>`;

  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(html);
}
