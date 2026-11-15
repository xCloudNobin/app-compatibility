const http = require('http');
const { version } = require('./common');
const port = Number(process.env.PORT);
http.createServer((req, res) => {
  res.setHeader('content-type', 'application/json');
  res.end(JSON.stringify({ app: 'multi-web', version: version(), port, pid: process.pid, path: req.url }));
}).listen(port, '127.0.0.1', () => console.log('multi-web ' + version() + ' listening on 127.0.0.1:' + port))
  .on('error', (e) => { console.error('multi-web could not listen on ' + port + ': ' + e.code); process.exit(1); });
