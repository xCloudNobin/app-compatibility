const http = require('node:http');
const version = require('./version.json').release;
const fixed = process.argv.indexOf('--port');
const port = fixed >= 0 ? Number(process.argv[fixed+1]) : process.env.IGNORE_PORT ? 31235 : Number(process.env.PORT || 3000);
const server = http.createServer((req,res) => {
  const data={entry:process.env.ECO_ENTRY||'root',cwd:process.cwd(),release:version,kind:process.env.ECO_KIND,value:process.env.FIXTURE_VALUE,nodeArgs:process.execArgv,maxMemoryRestart:process.env.max_memory_restart ? Number(process.env.max_memory_restart) : null,port,pid:process.pid};
  if(req.url==='/settings'){res.setHeader('Content-Type','application/json');res.end(JSON.stringify(data));return;}
  if(req.url!=='/' && req.url!=='/health'){res.statusCode=404;res.end('Not found');return;}
  res.setHeader('Content-Type','text/html');res.end('<!doctype html><title>PM2 ecosystem release proof</title><h1>'+version+'</h1><pre>'+JSON.stringify(data,null,2)+'</pre>');
});
server.listen(port,process.env.HOST||'127.0.0.1',()=>{if(process.send)process.send('ready');});
process.on('SIGINT',()=>server.close(()=>process.exit(0)));
