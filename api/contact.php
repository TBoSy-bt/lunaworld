<?php
/**
 * LunaWorld — Contact Form API
 * POST /api/contact.php
 *
 * Body JSON: { name, email, message }
 * On success: forwards message to Discord webhook (if configured)
 */

require_once __DIR__ . '/config.php';

setCorsHeaders();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonError('Метод не поддерживается.', 405);
}

// Rate limit: 3 requests per minute per IP
rateLimit('contact', 3, 60);

// Parse body
$raw  = file_get_contents('php://input');
$body = json_decode($raw, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    jsonError('Некорректный JSON.');
}

// Validate
$name    = trim($body['name']    ?? '');
$email   = trim($body['email']   ?? '');
$message = trim($body['message'] ?? '');

if (mb_strlen($name) < 2)    jsonError('Имя слишком короткое.');
if (mb_strlen($name) > 100)  jsonError('Имя слишком длинное.');
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) jsonError('Некорректный email.');
if (mb_strlen($message) < 10) jsonError('Сообщение слишком короткое.');
if (mb_strlen($message) > 2000) jsonError('Сообщение слишком длинное (макс. 2000 символов).');

// Sanitize
$name    = htmlspecialchars($name,    ENT_QUOTES, 'UTF-8');
$email   = htmlspecialchars($email,   ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');

// ─── Send to Discord webhook ──────────────────────────────────────────────────
if (DISCORD_WEBHOOK !== '') {
    $embed = [
        'title'       => '🌙 Новое сообщение через LunaWorld',
        'color'       => 0xa855f7,
        'fields'      => [
            ['name' => '👤 Имя',      'value' => $name,    'inline' => true],
            ['name' => '📧 Email',    'value' => $email,   'inline' => true],
            ['name' => '💬 Сообщение','value' => $message, 'inline' => false],
        ],
        'footer'      => ['text' => 'LunaWorld Contact Form'],
        'timestamp'   => date('c'),
    ];

    $payload = json_encode(['embeds' => [$embed]]);

    $ch = curl_init(DISCORD_WEBHOOK);
    curl_setopt_array($ch, [
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => $payload,
        CURLOPT_HTTPHEADER     => ['Content-Type: application/json'],
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 5,
    ]);
    curl_exec($ch);
    curl_close($ch);
}

// ─── Optionally send email ────────────────────────────────────────────────────
if (ADMIN_EMAIL !== '') {
    $subject = '=?UTF-8?B?' . base64_encode('[LunaWorld] Новое сообщение от ' . $name) . '?=';
    $headers = implode("\r\n", [
        'From: LunaWorld <noreply@' . parse_url(SITE_URL, PHP_URL_HOST) . '>',
        'Reply-To: ' . $email,
        'Content-Type: text/plain; charset=UTF-8',
        'MIME-Version: 1.0',
    ]);
    $text = "Имя: {$name}\nEmail: {$email}\n\nСообщение:\n{$message}";
    @mail(ADMIN_EMAIL, $subject, $text, $headers);
}

jsonSuccess(['message' => 'Сообщение отправлено! Мы свяжемся с тобой скоро. 🌙']);
