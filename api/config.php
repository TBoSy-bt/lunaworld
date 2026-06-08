<?php
// ─── LunaWorld — PHP Backend Config ───────────────────────────────────────────

define('DISCORD_INVITE', 'https://discord.gg/nVaJgdgchY');
define('DISCORD_WEBHOOK', getenv('DISCORD_WEBHOOK_URL') ?: ''); // Set in .env
define('SITE_URL',        getenv('SITE_URL') ?: 'https://lunaworld.gg');
define('ADMIN_EMAIL',     getenv('ADMIN_EMAIL') ?: 'admin@lunaworld.gg');

// ─── CORS helper (call at top of every endpoint) ──────────────────────────────
function setCorsHeaders(): void {
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '*';
    header("Access-Control-Allow-Origin: {$origin}");
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Content-Type: application/json; charset=utf-8');

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}

// ─── JSON response helpers ────────────────────────────────────────────────────
function jsonSuccess(array $data = [], int $code = 200): never {
    http_response_code($code);
    echo json_encode(['status' => 'success', ...$data], JSON_UNESCAPED_UNICODE);
    exit;
}

function jsonError(string $message, int $code = 400): never {
    http_response_code($code);
    echo json_encode(['status' => 'error', 'message' => $message], JSON_UNESCAPED_UNICODE);
    exit;
}

// ─── Rate-limiter (file-based, simple) ───────────────────────────────────────
function rateLimit(string $key, int $limit = 5, int $windowSec = 60): void {
    $dir  = sys_get_temp_dir() . '/lunaworld_rl';
    if (!is_dir($dir)) mkdir($dir, 0700, true);

    $ip   = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $file = $dir . '/' . md5($key . $ip) . '.json';
    $now  = time();

    $data = file_exists($file) ? json_decode(file_get_contents($file), true) : ['count' => 0, 'reset' => $now + $windowSec];

    if ($now > $data['reset']) {
        $data = ['count' => 0, 'reset' => $now + $windowSec];
    }

    if ($data['count'] >= $limit) {
        jsonError('Слишком много запросов. Попробуй позже.', 429);
    }

    $data['count']++;
    file_put_contents($file, json_encode($data));
}
