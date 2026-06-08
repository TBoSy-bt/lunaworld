<?php
/**
 * LunaWorld — Server Stats API
 * GET /api/members.php
 *
 * Returns: { members, online, guilds }
 * Uses Discord Bot API if BOT_TOKEN is set, otherwise returns static data.
 */

require_once __DIR__ . '/config.php';

setCorsHeaders();

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    jsonError('Метод не поддерживается.', 405);
}

rateLimit('stats', 30, 60);

$GUILD_ID  = getenv('DISCORD_GUILD_ID') ?: '';
$BOT_TOKEN = getenv('DISCORD_BOT_TOKEN') ?: '';

// ─── Try live Discord API ─────────────────────────────────────────────────────
if ($GUILD_ID && $BOT_TOKEN) {
    $cacheFile = sys_get_temp_dir() . '/lunaworld_stats.json';
    $cacheAge  = 120; // 2 min cache

    if (file_exists($cacheFile) && (time() - filemtime($cacheFile)) < $cacheAge) {
        $cached = json_decode(file_get_contents($cacheFile), true);
        jsonSuccess($cached);
    }

    $ch = curl_init("https://discord.com/api/v10/guilds/{$GUILD_ID}?with_counts=true");
    curl_setopt_array($ch, [
        CURLOPT_HTTPHEADER     => ["Authorization: Bot {$BOT_TOKEN}"],
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 5,
    ]);
    $res  = curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($code === 200) {
        $guild = json_decode($res, true);
        $stats = [
            'members'     => $guild['approximate_member_count']   ?? 0,
            'online'      => $guild['approximate_presence_count'] ?? 0,
            'name'        => $guild['name']  ?? 'LunaWorld',
            'description' => $guild['description'] ?? '',
            'icon'        => $guild['icon']
                ? "https://cdn.discordapp.com/icons/{$GUILD_ID}/{$guild['icon']}.png"
                : null,
        ];
        file_put_contents($cacheFile, json_encode($stats));
        jsonSuccess($stats);
    }
}

// ─── Fallback static data ─────────────────────────────────────────────────────
jsonSuccess([
    'members'     => 1250,
    'online'      => 87,
    'name'        => 'LunaWorld',
    'description' => '🌙 Твоя вселенная общения, знакомств и игр.',
    'icon'        => null,
    'static'      => true,
]);
