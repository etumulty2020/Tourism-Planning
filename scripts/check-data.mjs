import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const elements=new Map();
const el=()=>({innerHTML:'',value:'',textContent:'',addEventListener(){},setAttribute(){},removeAttribute(){},showModal(){},close(){},click(){},remove(){}});
let download;
const context=vm.createContext({window:{},console,Intl,Number,String,Math,Blob,setTimeout:f=>f(),URL:{createObjectURL:b=>(download=b,'blob:test'),revokeObjectURL(){}},document:{getElementById:id=>{if(!elements.has(id))elements.set(id,el());return elements.get(id);},querySelectorAll:()=>[],addEventListener(){},createElement:el,body:{append(){}}}});
vm.runInContext(fs.readFileSync(root+'/dist/data.js','utf8'),context);
vm.runInContext(fs.readFileSync(root+'/dist/tourism.js','utf8'),context);
const run=code=>vm.runInContext(code,context);
assert.equal(run('countries.length'),16);
assert.equal(run('Object.keys(countries[0]).length'),96);
assert.equal(run('num("")'),null);
assert.equal(run('num("0")'),0);
assert.equal(run('available("tourism_arrivals")'),14);
assert.equal(run('available("resident_growth_support_pct")'),1);
assert.equal(run('seasonStats(byName("Croatia")).total'),93643696);
assert.equal(run('seasonStats(byName("Croatia")).peak'),7);
assert.ok(Math.abs(run('seasonStats(byName("Croatia")).top2')-55.8833046476986)<0.01);
assert.equal(run('seasonStats(byName("Iran"))'),null);
assert.equal(run('money("16241")'),'$16.24B');
assert.ok(run('byName("Iran").business_price_usd_per_kwh === ""'));
for(const d of context.window.ENERGY_DATA){
 for(const tab of ['overview','compare','season','place','residents','data']){
  run(`state.focus=${JSON.stringify(d.country)};state.tab=${JSON.stringify(tab)};render();`);
  assert.doesNotMatch(elements.get('content').innerHTML,/NaN|undefined|Infinity/);
 }
 for(const value of Object.values(d))assert.equal(typeof value,'string');
}
run('state.query="Croatia";state.coverage="all";exportCSV()');
const csv=await download.text();
assert.equal(csv.trim().split('\n').length,2);
assert.ok(csv.includes('"Croatia"'));
assert.ok(csv.includes('"resident_survey_source_url"'));
assert.ok(csv.includes('"17'));
run('state.query="zzzz"');assert.equal(run('filtered().length'),0);
run('state.query="";state.coverage="seasonality_year"');assert.equal(run('filtered().length'),3);
run('state.coverage="all";state.sort="tourism_arrivals";state.dir=-1');assert.equal(run('filtered()[15].tourism_arrivals'),'');
run('state.metric="tourism_arrivals";state.arrivalType="Accommodation arrivals"');assert.ok(run('chart().includes("2 countries with data")'));
console.log('PASS: schema, blanks/zero, source coverage, seasonal arithmetic, 96 country/view combinations, definition filter, missing-value sorting and filtered CSV export.');
