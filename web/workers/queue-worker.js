// Stands in for a queue consumer: a long-running process with no port.
const { version, record } = require('../common');
console.error('qa-check4-multi-queue-exit-on-start');
process.exit(42);
console.log('multi-queue ' + version() + ' started');
record('queue-start');
setInterval(() => console.log('multi-queue ' + version() + ' alive'), 30000);
