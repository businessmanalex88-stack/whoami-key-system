export default function handler(req, res) {
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
        .container { max-width: 1200px; margin: 0 auto; }
        .header {
            text-align: center;
            margin-bottom: 40px;
            padding: 40px;
            background: rgba(0, 255, 127, 0.1);
            border-radius: 15px;
            border: 1px solid rgba(0, 255, 127, 0.3);
        }
        .header h1 {
            font-size: 3.5em;
            color: #00ff7f;
            margin-bottom: 10px;
            text-shadow: 0 0 20px rgba(0, 255, 127, 0.5);
        }
        .header p {
            color: #b0ffb0;
            font-size: 1.3em;
            margin-bottom: 20px;
        }
        .status-badge {
            display: inline-block;
            padding: 8px 16px;
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
        .dashboard {
            background: rgba(20, 20, 20, 0.9);
            padding: 30px;
            border-radius: 12px;
            margin-bottom: 25px;
            border: 1px solid rgba(0, 255, 127, 0.2);
        }
        .dashboard h3 {
            color: #00ff7f;
            margin-bottom: 15px;
            font-size: 1.4em;
        }
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 25px;
            margin-bottom: 30px;
        }
        .card {
            background: rgba(30, 30, 30, 0.9);
            padding: 30px;
            border-radius: 12px;
            border: 1px solid rgba(0, 255, 127, 0.2);
            transition: all 0.3s ease;
        }
        .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 35px rgba(0, 255, 127, 0.1);
            border-color: rgba(0, 255, 127, 0.4);
        }
        .card h3 {
            color: #00ff7f;
            margin-bottom: 10px;
            font-size: 1.3em;
        }
        .card p {
            color: #999;
            font-size: 14px;
            margin-bottom: 20px;
            line-height: 1.4;
        }
        .btn {
            background: linear-gradient(45deg, #00ff7f, #00cc66);
            color: black;
            border: none;
            padding: 14px 24px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: bold;
            width: 100%;
            margin: 8px 0;
            transition: all 0.3s ease;
            font-size: 14px;
        }
        .btn:hover {
            background: linear-gradient(45deg, #00cc66, #009955);
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(0, 255, 127, 0.3);
        }
        .btn-secondary {
            background: linear-gradient(45deg, #007acc, #005999);
            color: white;
        }
        .btn-secondary:hover {
            background: linear-gradient(45deg, #005999, #004477);
        }
        .btn-danger {
            background: linear-gradient(45deg, #ff6666, #cc4444);
            color: white;
        }
        .btn-danger:hover {
            background: linear-gradient(45deg, #cc4444, #aa2222);
        }
        .input {
            width: 100%;
            padding: 14px;
            margin: 10px 0;
            background: rgba(40, 40, 40, 0.8);
            border: 1px solid rgba(0, 255, 127, 0.3);
            border-radius: 8px;
            color: white;
            font-size: 14px;
        }
        .input:focus {
            outline: none;
            border-color: #00ff7f;
            box-shadow: 0 0 15px rgba(0, 255, 127, 0.2);
        }
        .input::placeholder {
            color: #888;
        }
        .result {
            background: rgba(15, 15, 15, 0.9);
            padding: 18px;
            border-radius: 8px;
            margin-top: 15px;
            font-family: 'Courier New', monospace;
            font-size: 13px;
            max-height: 250px;
            overflow-y: auto;
            border: 1px solid rgba(0, 255, 127, 0.1);
            white-space: pre-wrap;
            line-height: 1.4;
        }
        .success { color: #00ff7f; }
        .error { color: #ff6666; }
        .loading { color: #ffaa00; }
        .info-section {
            margin-top: 40px;
            padding: 30px;
            background: rgba(20, 20, 20, 0.5);
            border-radius: 12px;
            text-align: center;
            border: 1px solid rgba(0, 255, 127, 0.1);
        }
        .info-section h3 {
            color: #00ff7f;
            margin-bottom: 20px;
            font-size: 1.4em;
        }
        .info-section code {
            background: rgba(0, 255, 127, 0.1);
            color: #00ff7f;
            padding: 6px 12px;
            border-radius: 6px;
            font-family: monospace;
            font-size: 14px;
        }
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin: 20px 0;
        }
        .stat-item {
            background: rgba(0, 255, 127, 0.05);
            padding: 15px;
            border-radius: 8px;
            border: 1px solid rgba(0, 255, 127, 0.1);
        }
        .stat-item strong {
            color: #00ff7f;
            font-size: 1.1em;
        }
        @media (max-width: 768px) {
            .header h1 { font-size: 2.5em; }
            .grid { grid-template-columns: 1fr; }
            .card { padding: 20px; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔐 WarpahVip Key System</h1>
            <p>Professional Delta Executor Key Management System</p>
            <p style="font-size: 1em; color: #888; margin: 10px 0;">Sistem Lisensi 1-User-1-Device dengan Keamanan Tinggi</p>
            <div id="apiStatus" class="status-badge status-checking">🔄 Mengecek Status API...</div>
        </div>

        <div class="dashboard">
            <h3>📊 Dashboard Sistem</h3>
            <div id="systemInfo">Memuat informasi sistem...</div>
        </div>

        <div class="grid">
            <div class="card">
                <h3>🔑 Buat Kunci Baru</h3>
                <p>Buat lisensi kunci baru dengan durasi khusus untuk pengguna</p>
                <input type="password" class="input" id="adminPass" placeholder="Password Admin" value="Whoamidev1819">
                <input type="number" class="input" id="keyCount" placeholder="Jumlah kunci (1-10)" value="3" min="1" max="10">
                <select class="input" id="keyDuration">
                    <option value="1d">1 Hari</option>
                    <option value="7d">7 Hari</option>
                    <option value="30d" selected>30 Hari</option>
                    <option value="90d">90 Hari</option>
                    <option value="365d">1 Tahun</option>
                </select>
                <button class="btn" onclick="generateKeys()">🔑 Buat Kunci</button>
                <div id="generateResult" class="result">Siap membuat kunci baru...</div>
            </div>

            <div class="card">
                <h3>📋 Manajemen Kunci</h3>
                <p>Lihat dan kelola semua kunci yang telah dibuat</p>
                <button class="btn" onclick="loadAllKeys()">📋 Muat Semua Kunci</button>
                <button class="btn btn-secondary" onclick="refreshSystem()">🔄 Perbarui Sistem</button>
                <button class="btn btn-danger" onclick="clearAllKeys()" style="margin-top: 10px;">🗑️ Hapus Semua Kunci</button>
                <div id="keysResult" class="result">Klik 'Muat Semua Kunci' untuk melihat...</div>
            </div>

            <div class="card">
                <h3>✅ Tes Validasi Kunci</h3>
                <p>Uji validasi kunci dan pengikatan perangkat</p>
                <input type="text" class="input" id="testKey" placeholder="Masukkan kunci untuk diuji (contoh: WARPAH_TEST001)">
                <input type="text" class="input" id="testUser" placeholder="ID Pengguna Test" value="testuser123">
                <button class="btn" onclick="validateKey()">✅ Validasi Kunci</button>
                <div id="validateResult" class="result">Masukkan kunci di atas untuk diuji...</div>
            </div>

            <div class="card">
                <h3>🔧 Tes API & Debug</h3>
                <p>Uji semua endpoint API dan koneksi sistem</p>
                <button class="btn" onclick="testConnection()">🔌 Tes Koneksi</button>
                <button class="btn btn-secondary" onclick="testAllEndpoints()">🧪 Tes Semua Endpoint</button>
                <button class="btn btn-secondary" onclick="viewLogs()">📜 Lihat Log Penggunaan</button>
                <div id="apiResult" class="result">Tools untuk testing dan debugging API...</div>
            </div>
        </div>

        <div class="info-section">
            <h3>🎮 Informasi Integrasi</h3>
            <div class="stats-grid">
                <div class="stat-item">
                    <strong>API Base URL:</strong><br>
                    <code>${req.headers.host}/api</code>
                </div>
                <div class="stat-item">
                    <strong>Test Keys:</strong><br>
                    WARPAH_TEST001, WARPAH_TEST002
                </div>
                <div class="stat-item">
                    <strong>Admin Password:</strong><br>
                    <code>Whoamidev1819</code>
                </div>
                <div class="stat-item">
                    <strong>Status:</strong><br>
                    <span id="integrationStatus">Menunggu...</span>
                </div>
            </div>
            <p style="margin-top: 20px; color: #999; font-size: 14px; line-height: 1.5;">
                Sistem ini menyediakan validasi kunci 1-user-1-device untuk Delta Executor.<br>
                Kunci otomatis terikat pada perangkat pertama yang menggunakannya.<br>
                Hanya admin yang dapat membuat, mengelola, dan mereset kunci.
            </p>
        </div>
    </div>

    <script>
        const API_BASE = '/api';
        let systemData = null;
        let refreshInterval = null;

        // Initialize system pada saat halaman dimuat
        window.onload = function() {
            updateStatus('🔄 Menginisialisasi sistem...');
            setTimeout(() => {
                testConnection();
                loadSystemInfo();
                startAutoRefresh();
            }, 1000);
        };

        function updateStatus(message, type = 'checking') {
            const statusEl = document.getElementById('apiStatus');
            statusEl.textContent = message;
            statusEl.className = 'status-badge status-' + type;
            
            // Update integration status
            document.getElementById('integrationStatus').textContent = 
                type === 'online' ? 'Online' : type === 'offline' ? 'Offline' : 'Mengecek...';
        }

        async function testConnection() {
            updateResult('apiResult', '🔄 Menguji koneksi API...', 'loading');
            
            try {
                const response = await fetch(API_BASE + '/test');
                if (!response.ok) throw new Error('HTTP ' + response.status);
                
                const data = await response.json();
                
                if (data.success) {
                    updateStatus('🟢 API Online', 'online');
                    updateResult('apiResult', '✅ Koneksi API: BERHASIL\\n\\n' + JSON.stringify(data, null, 2), 'success');
                } else {
                    throw new Error('API mengembalikan response non-success');
                }
            } catch (error) {
                updateStatus('🔴 API Offline', 'offline');
                updateResult('apiResult', '❌ Koneksi API: GAGAL\\n\\nError: ' + error.message, 'error');
            }
        }

        async function loadSystemInfo() {
            try {
                const response = await fetch(API_BASE + '/admin?password=Whoamidev1819');
                if (!response.ok) throw new Error('HTTP ' + response.status);
                
                const contentType = response.headers.get('content-type');
                if (!contentType || !contentType.includes('application/json')) {
                    const text = await response.text();
                    throw new Error('Response bukan JSON: ' + text.substring(0, 100));
                }
                
                const data = await response.json();
                
                if (data.success) {
                    systemData = data;
                    const info = \`📊 Status Sistem: Online
🔑 Total Kunci: \${data.total}
✅ Kunci Aktif: \${data.active}
❌ Kunci Expired: \${data.total - data.active}
🕐 Terakhir Update: \${new Date().toLocaleString()}
🌐 Waktu Server: \${new Date(data.timestamp).toLocaleString()}\`;
                    
                    document.getElementById('systemInfo').textContent = info;
                } else {
                    document.getElementById('systemInfo').textContent = '❌ Gagal memuat informasi sistem\\nError: ' + (data.error || 'Unknown error');
                }
            } catch (error) {
                console.error('System Info Error:', error);
                document.getElementById('systemInfo').textContent = '❌ System Error: ' + error.message;
            }
        }

        async function generateKeys() {
            const password = document.getElementById('adminPass').value.trim();
            const count = parseInt(document.getElementById('keyCount').value) || 1;
            const duration = document.getElementById('keyDuration').value || '30d';
            
            if (!password) {
                updateResult('generateResult', '⚠️ Masukkan password admin', 'error');
                return;
            }
            
            if (count < 1 || count > 10) {
                updateResult('generateResult', '⚠️ Jumlah kunci harus antara 1-10', 'error');
                return;
            }
            
            updateResult('generateResult', \`🔄 Membuat \${count} kunci dengan durasi \${duration}...\`, 'loading');
            
            try {
                const response = await fetch(API_BASE + '/create-key', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ password, count, duration })
                });
                
                if (!response.ok) throw new Error('HTTP ' + response.status);
                const data = await response.json();
                
                if (data.success) {
                    let result = \`✅ Berhasil membuat \${data.count} kunci:\\n\\n\`;
                    data.keys.forEach((key, index) => {
                        result += \`\${index + 1}. \${key}\\n\`;
                    });
                    result += \`\\n🔄 Memperbarui sistem otomatis...\\n⏰ Durasi: \${duration}\`;
                    
                    updateResult('generateResult', result, 'success');
                    
                    // Auto-refresh system info dan keys list
                    setTimeout(() => {
                        loadSystemInfo();
                        loadAllKeys();
                    }, 2000);
                } else {
                    updateResult('generateResult', '❌ Pembuatan Gagal\\n\\nError: ' + (data.error || 'Unknown error'), 'error');
                }
            } catch (error) {
                updateResult('generateResult', '❌ Network Error\\n\\nError: ' + error.message, 'error');
            }
        }

        async function loadAllKeys() {
            const password = document.getElementById('adminPass').value.trim();
            
            if (!password) {
                updateResult('keysResult', '⚠️ Masukkan password admin', 'error');
                return;
            }
            
            updateResult('keysResult', '🔄 Memuat semua kunci...', 'loading');
            
            try {
                const response = await fetch(API_BASE + \`/admin?password=\${encodeURIComponent(password)}\`);
                if (!response.ok) throw new Error('HTTP ' + response.status);
                
                const data = await response.json();
                
                if (data.success) {
                    let result = \`📊 Statistik Kunci:\\nTotal: \${data.total} kunci | Aktif: \${data.active} kunci\\n\\n\`;
                    
                    if (data.keys.length === 0) {
                        result += '📝 Tidak ada kunci ditemukan.\\n\\nGunakan bagian "Buat Kunci" untuk membuat kunci baru.';
                    } else {
                        result += '📋 Detail Kunci:\\n\\n';
                        
                        data.keys.forEach((key, index) => {
                            const isActive = key.active && Date.now() < key.expires;
                            const status = isActive ? '✅ AKTIF' : '❌ EXPIRED';
                            const bound = key.device_id ? '🔒 TERIKAT' : '🔓 BEBAS';
                            const expireDate = new Date(key.expires).toLocaleDateString();
                            const createdDate = new Date(key.created).toLocaleDateString();
                            
                            result += \`\${index + 1}. \${key.key}\\n\`;
                            result += \`   Status: \${status} | Device: \${bound}\\n\`;
                            result += \`   Penggunaan: \${key.usage_count}x | Dibuat: \${createdDate}\\n\`;
                            result += \`   Expired: \${expireDate}\\n\\n\`;
                        });
                    }
                    
                    updateResult('keysResult', result, 'success');
                } else {
                    updateResult('keysResult', '❌ Gagal Memuat Kunci\\n\\nError: ' + (data.error || 'Access denied'), 'error');
                }
            } catch (error) {
                updateResult('keysResult', '❌ Network Error\\n\\nError: ' + error.message, 'error');
            }
        }

        async function validateKey() {
            const key = document.getElementById('testKey').value.trim();
            const user_id = document.getElementById('testUser').value.trim();
            
            if (!key) {
                updateResult('validateResult', '⚠️ Masukkan kunci untuk divalidasi', 'error');
                return;
            }
            
            updateResult('validateResult', \`🔄 Memvalidasi kunci: \${key}...\`, 'loading');
            
            try {
                const response = await fetch(API_BASE + '/validate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
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
                
                if (!response.ok) throw new Error('HTTP ' + response.status);
                const data = await response.json();
                
                if (data.success) {
                    const result = \`✅ VALIDASI KUNCI: BERHASIL\\n\\n\` +
                        \`🔑 Kunci: \${data.keyData.key}\\n\` +
                        \`📊 Jumlah Penggunaan: \${data.keyData.usage_count}\\n\` +
                        \`🔒 Device Terikat: \${data.keyData.device_bound ? 'Ya' : 'Tidak'}\\n\` +
                        \`⏰ Expired: \${new Date(data.keyData.expires).toLocaleDateString()}\\n\\n\` +
                        \`✅ Kunci ini valid dan siap digunakan!\\n\` +
                        \`💡 Status: Kunci akan terikat pada perangkat ini.\`;
                    
                    updateResult('validateResult', result, 'success');
                } else {
                    const result = \`❌ VALIDASI KUNCI: GAGAL\\n\\n\` +
                        \`🔑 Kunci: \${key}\\n\` +
                        \`❌ Alasan: \${data.reason}\\n\\n\` +
                        \`💡 Tips:\\n\` +
                        \`• Periksa apakah kunci diketik dengan benar\\n\` +
                        \`• Pastikan kunci belum expired\\n\` +
                        \`• Kunci mungkin sudah terikat pada device lain\\n\` +
                        \`• Gunakan kunci test: WARPAH_TEST001\`;
                    
                    updateResult('validateResult', result, 'error');
                }
            } catch (error) {
                updateResult('validateResult', '❌ Network Error\\n\\nTidak dapat memvalidasi kunci: ' + error.message, 'error');
            }
        }

        async function testAllEndpoints() {
            updateResult('apiResult', '🧪 Menguji semua endpoint API...', 'loading');
            
            const endpoints = [
                {
                    name: 'GET /api/test',
                    method: 'GET',
                    url: '/api/test',
                    description: 'Test konektivitas dasar'
                },
                {
                    name: 'GET /api/admin',
                    method: 'GET',
                    url: '/api/admin?password=Whoamidev1819',
                    description: 'Akses admin panel'
                },
                {
                    name: 'POST /api/validate',
                    method: 'POST',
                    url: '/api/validate',
                    description: 'Validasi kunci',
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
                    description: 'Pembuatan kunci',
                    body: {
                        password: 'Whoamidev1819',
                        count: 1,
                        duration: '30d'
                    }
                }
            ];
            
            let result = '🧪 Hasil Test Endpoint API:\\n\\n';
            let allPassed = true;
            
            for (const endpoint of endpoints) {
                try {
                    const options = {
                        method: endpoint.method
                    };
                    
                    if (endpoint.body) {
                        options.headers = { 'Content-Type': 'application/json' };
                        options.body = JSON.stringify(endpoint.body);
                    }
                    
                    const response = await fetch(endpoint.url, options);
                    const status = response.ok ? '✅' : '❌';
                    const statusCode = response.status;
                    
                    if (!response.ok) allPassed = false;
                    
                    result += \`\${status} \${endpoint.name}\\n\`;
                    result += \`   Status: \${statusCode} | \${endpoint.description}\\n\\n\`;
                    
                } catch (error) {
                    allPassed = false;
                    result += \`❌ \${endpoint.name}\\n\`;
                    result += \`   Error: \${error.message}\\n\\n\`;
                }
            }
            
            result += allPassed ? 
                '🎉 Semua endpoint berfungsi dengan baik!' : 
                '⚠️ Beberapa endpoint mengalami masalah.';
            
            updateResult('apiResult', result, allPassed ? 'success' : 'error');
        }

        async function viewLogs() {
            updateResult('apiResult', '📜 Memuat log penggunaan...', 'loading');
            
            try {
                const response = await fetch(API_BASE + '/usage-log?password=Whoamidev1819&limit=20');
                if (!response.ok) throw new Error('HTTP ' + response.status);
                
                const data = await response.json();
                
                if (data.success) {
                    let result = \`📜 Log Penggunaan (20 terakhir):\\nTotal: \${data.total} log\\n\\n\`;
                    
                    if (data.logs.length === 0) {
                        result += 'Belum ada log penggunaan.';
                    } else {
                        data.logs.forEach((log, index) => {
                            const date = new Date(log.timestamp).toLocaleString();
                            result += \`\${index + 1}. \${log.key}\\n\`;
                            result += \`   User: \${log.user_id} | Action: \${log.action}\\n\`;
                            result += \`   Time: \${date}\\n\\n\`;
                        });
                    }
                    
                    updateResult('apiResult', result, 'success');
                } else {
                    updateResult('apiResult', '❌ Gagal memuat log: ' + data.error, 'error');
                }
            } catch (error) {
                updateResult('apiResult', '❌ Error: ' + error.message, 'error');
            }
        }

        async function clearAllKeys() {
            if (!confirm('Hapus SEMUA kunci? Tindakan ini tidak dapat dibatalkan!')) {
                return;
            }
            
            const password = document.getElementById('adminPass').value.trim();
            if (!password) {
                updateResult('keysResult', '⚠️ Masukkan password admin', 'error');
                return;
            }
            
            updateResult('keysResult', '🗑️ Menghapus semua kunci...', 'loading');
            
            try {
                const response = await fetch(API_BASE + '/clear-keys', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ password })
                });
                
                if (!response.ok) throw new Error('HTTP ' + response.status);
                const data = await response.json();
                
                if (data.success) {
                    updateResult('keysResult', '✅ Semua kunci berhasil dihapus!\\n\\n🔄 Memperbarui sistem...', 'success');
                    setTimeout(() => {
                        loadSystemInfo();
                        loadAllKeys();
                    }, 2000);
                } else {
                    updateResult('keysResult', '❌ Gagal menghapus kunci: ' + data.error, 'error');
                }
            } catch (error) {
                updateResult('keysResult', '❌ Error: ' + error.message, 'error');
            }
        }

        function refreshSystem() {
            updateStatus('🔄 Memperbarui sistem...', 'checking');
            loadSystemInfo();
            testConnection();
            updateResult('keysResult', '🔄 Memperbarui data...', 'loading');
            setTimeout(loadAllKeys, 1000);
        }

        function startAutoRefresh() {
            // Auto-refresh setiap 2 menit
            refreshInterval = setInterval(() => {
                if (systemData) {
                    loadSystemInfo();
                }
            }, 120000);
        }

        function updateResult(elementId, text, type) {
            const element = document.getElementById(elementId);
            if (element) {
                element.textContent = text;
                element.className = `result ${type}`;
            }
        }

        // Cleanup interval saat page unload
        window.addEventListener('beforeunload', function() {
            if (refreshInterval) {
                clearInterval(refreshInterval);
            }
        });
    </script>
</body>
</html>`;

  return res.status(200).send(html);
}
