const fs = require('fs');
const path = require('path');
const version = () => JSON.parse(fs.readFileSync(path.join(__dirname, 'version.json'), 'utf8')).version;
// Outside the release tree, so runs from every release land in one file.
const runLog = path.join(process.env.HOME || '/tmp', 'multi-fixture-runs.log');
const record = (kind) => fs.appendFileSync(runLog, [new Date().toISOString(), kind, process.pid, version(), __dirname].join(' ') + '\n');
module.exports = { version, record, runLog };
