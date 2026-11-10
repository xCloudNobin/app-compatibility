const fs = require('node:fs');
const env = fs.existsSync('.env') ? fs.readFileSync('.env', 'utf8') : '';
const kinds = [...env.matchAll(/^ECO_KIND=(\w+)/gm)];
const kind = process.env.ECO_KIND || kinds.at(-1)?.[1] || 'cluster';
const app = {name:'ecosystem-fixture', script:'fixtures/node-ecosystem/server.cjs', autorestart:true, kill_timeout:5000, wait_ready:true, listen_timeout:5000,
  env:{PORT:process.env.PORT, FIXTURE_VALUE:kind+'-env', ECO_KIND:kind}, merge_logs:true};
if (kind === 'cluster') Object.assign(app,{exec_mode:'cluster',instances:2});
if (kind === 'fork') Object.assign(app,{exec_mode:'fork',node_args:['--max-old-space-size=96'],max_memory_restart:'140M'});
if (kind === 'fixed') app.args=['--port','31234'];
if (kind === 'ignores') app.env.IGNORE_PORT='1';
module.exports={apps:[app]};
