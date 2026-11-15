// Multi-app PM2 file: one web app and two same-code workers, each started through
// env-cmd from web/ with the site .env, as some customer apps do.
// MULTI_NO_OVERRIDE=1 (in the deploy shell) adds env-cmd's --no-override.
const envCmd = (file) => (process.env.MULTI_NO_OVERRIDE === '1' ? '--no-override ' : '') + '-f ../.env node ' + file;

module.exports = {
  apps: [
    {
      name: 'multi-web',
      cwd: 'web',
      script: 'node_modules/.bin/env-cmd',
      args: envCmd('main.js'),
      interpreter: 'none',
    },
    {
      name: 'multi-queue',
      cwd: 'web',
      script: 'node_modules/.bin/env-cmd',
      args: envCmd('queue.js'),
      interpreter: 'none',
    },
    {
      name: 'multi-cron',
      cwd: 'web',
      script: 'node_modules/.bin/env-cmd',
      args: envCmd('cron.js'),
      interpreter: 'none',
    },
  ],
};
