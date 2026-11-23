# php-lock-root-gap

A tiny plain-PHP app used as a deploy-detection fixture for xCloud
(a branch fixture: branch `fixture/php-lock-root-gap` of [xCloudNobin/app-compatibility](https://github.com/xCloudNobin/app-compatibility), registered in its `catalog.json`).

## The case

- Root `composer.json` requires `php: "~8.2.0 || ^8.4"`, so PHP 8.3 is **excluded**.
- The only locked package, `phpunit/php-timer 8.0.0`, requires `php: ">=8.3"`.
- The highest lower bound across the lock is 8.3, but the root constraint rejects 8.3.
  The lowest PHP branch that every constraint allows together is **8.4**.

On PHP 8.3, `composer install` fails with
`Root composer.json requires php ~8.2.0 || ^8.4 but your php version (8.3.x) does not satisfy that requirement.`
On PHP 8.4 it installs one package and the app serves.

## Run

- Runtime: PHP 8.4 (any `^8.4`), Composer 2.
- Install: `composer install --no-dev --no-interaction`
- Web root: `public/`
- `GET /` shows the PHP version; `GET /health` returns JSON `{"status":"ok","php":"8.4.x",...}`.
- No database, no environment variables, no build step.

## Local check

```sh
composer install --no-dev
php -S 127.0.0.1:8080 -t public
curl -s 127.0.0.1:8080/health
```

## License

MIT, see LICENSE.
