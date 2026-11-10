// Native Node entrypoint; the compose file is deliberately inert.
const config = require('./ecosystem.config.cjs');
// Normal deploy scripts receive this name from xCloud, including after turn-off.
config.apps[0].name = process.env.PM2_PROCESS_NAME || config.apps[0].name;
module.exports = config;
