// Stands in for an in-process cron worker: one run every 10 seconds, aligned to
// the clock. Two copies at once write two lines for the same slot (overlap).
const { version, record } = require('./common');
console.log('multi-cron ' + version() + ' started');
const tick = () => { record('cron-run'); setTimeout(tick, 10000 - (Date.now() % 10000)); };
setTimeout(tick, 10000 - (Date.now() % 10000));
