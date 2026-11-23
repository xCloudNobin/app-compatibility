<?php

declare(strict_types=1);

require __DIR__.'/../vendor/autoload.php';

$report = App\Status::report();

if (($_SERVER['REQUEST_URI'] ?? '/') === '/health') {
    header('Content-Type: application/json');
    echo json_encode($report), "\n";
    exit;
}

header('Content-Type: text/html; charset=utf-8');
$php = htmlspecialchars($report['php'], ENT_QUOTES);
echo "<!doctype html><title>php-lock-root-gap</title><h1>php-lock-root-gap</h1><p>Running on PHP {$php}.</p><p><a href=\"/health\">/health</a></p>\n";
