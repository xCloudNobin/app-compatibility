<?php

declare(strict_types=1);

namespace App;

use SebastianBergmann\Timer\Timer;

final class Status
{
    /** @return array{status: string, php: string, php_branch: string, timer_ms: float} */
    public static function report(): array
    {
        $timer = new Timer();
        $timer->start();
        $duration = $timer->stop();

        return [
            'status' => 'ok',
            'php' => PHP_VERSION,
            'php_branch' => PHP_MAJOR_VERSION.'.'.PHP_MINOR_VERSION,
            'timer_ms' => round($duration->asMilliseconds(), 3),
        ];
    }
}
