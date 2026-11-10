const {test}=require('node:test'); const assert=require('node:assert/strict');
for(const kind of ['cluster','fork','fixed','ignores']) test(kind+' ecosystem settings',()=>{
 process.env.ECO_KIND=kind;process.env.PORT='43210';delete require.cache[require.resolve('../../ecosystem.config.cjs')];
 const app=require('../../ecosystem.config.cjs').apps[0];assert.equal(app.env.PORT,'43210');assert.equal(app.env.FIXTURE_VALUE,kind+'-env');
 if(kind==='cluster'){assert.equal(app.instances,2);assert.equal(app.exec_mode,'cluster');}
 if(kind==='fork'){assert.deepEqual(app.node_args,['--max-old-space-size=96']);assert.equal(app.max_memory_restart,'140M');}
 if(kind==='fixed')assert.deepEqual(app.args,['--port','31234']);
 if(kind==='ignores')assert.equal(app.env.IGNORE_PORT,'1');
});

test('the last fixture selector in .env wins, matching shell sourcing', (t)=>{
 const fs=require('node:fs'), existed=fs.existsSync('.env'), original=existed?fs.readFileSync('.env'):null;
 const before=process.env.ECO_KIND;delete process.env.ECO_KIND;
 t.after(()=>{if(existed)fs.writeFileSync('.env',original);else fs.unlinkSync('.env');if(before===undefined)delete process.env.ECO_KIND;else process.env.ECO_KIND=before;});
 fs.writeFileSync('.env','ECO_KIND=ignores\nECO_KIND=cluster\n');delete require.cache[require.resolve('../../ecosystem.config.cjs')];
 const app=require('../../ecosystem.config.cjs').apps[0];assert.equal(app.env.ECO_KIND,'cluster');assert.equal(app.exec_mode,'cluster');assert.equal(app.instances,2);
});

test('root js entrypoint keeps the same single app',()=>{
 const app=require('../../ecosystem.config.js');assert.equal(app.apps.length,1);assert.deepEqual(app,require('../../ecosystem.config.cjs'));
});
