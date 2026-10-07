const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const fs=require('node:fs'),path=require('node:path'),{pathToFileURL}=require('node:url');
const ROOT=path.resolve(__dirname,'..'),OUT=path.join(ROOT,'.tmp','study-qa');fs.mkdirSync(OUT,{recursive:true});
const checks=[];function check(ok,name){checks.push({ok,name});console.log((ok?'PASS ':'FAIL ')+name);if(!ok)throw Error(name);}
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.BROWSER_PATH?{executablePath:process.env.BROWSER_PATH}:{})});
 try{
  const ctx=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2,acceptDownloads:true,reducedMotion:'reduce'});await ctx.setOffline(true);
  const page=await ctx.newPage(),errors=[],requests=[];page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(/^https?:/.test(r.url()))requests.push(r.url());});
  await page.goto(pathToFileURL(path.join(ROOT,'question-bank.html')).href);await page.locator('.exam-card').first().waitFor();
  check(await page.locator('.exam-card').count()===33,'all 33 section exams load offline');
  check(await page.locator('.brand img').evaluate(e=>e.complete&&e.naturalWidth>0&&e.src.startsWith('data:')),'original St Paul logo loads from embedded data');
  check((await page.title()).includes("St. Paul's Iloilo Pediatrics Exam Studio"),'library uses St Paul title');
  check(await page.locator('.page-footer').innerText().then(t=>t.includes('(c) jstiosin 2026')),'HTML footer includes exact credit');
  check(await page.evaluate(()=>getComputedStyle(document.documentElement).getPropertyValue('--primary').trim()==="#005229"),'library uses saved deep green palette');
  const data=await page.evaluate(()=>JSON.parse(document.getElementById('examData').textContent));
  check(data.reduce((n,s)=>n+s.items.length,0)===6700,'study library includes all 6700 questions');
  check(data.find(s=>s.id===18).items.every(q=>q.options.every(o=>!/[✓✔✅☑]/.test(o.text))),'corrected respiratory options have no answer marks');
  for(const [width,height] of [[320,568],[360,800],[390,844],[430,932],[768,1024],[932,430]]){
   await page.setViewportSize({width,height});
   check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${width}px library has no horizontal overflow`);
   check(await page.locator('#libraryNav').evaluate(e=>e.getBoundingClientRect().height>=44),`${width}px navigation is touch sized`);
   check(await page.locator('#searchInput').evaluate(e=>parseFloat(getComputedStyle(e).fontSize)>=16),`${width}px search text is readable`);
   await page.screenshot({path:path.join(OUT,`library-${width}.png`)});
  }
  await page.setViewportSize({width:390,height:844});await page.locator('#searchInput').fill('respiratory');
  check(await page.locator('.exam-card').count()===1,'section search narrows the library');
  await page.locator('#searchInput').fill('');await page.locator('#groupSelect').selectOption('specialty');
  check(await page.locator('.exam-card').count()===6,'section group filter works');await page.locator('#groupSelect').selectOption('all');
  await page.locator('[data-section="18"]').tap();const section=data.find(s=>s.id===18);
  check(await page.locator('#examTitle').innerText()==='The Respiratory System','opens requested section');
  check(await page.locator('.rationale').count()===0,'practice attempt initially conceals explanations');
  for(const [width,height] of [[320,568],[390,844],[768,1024],[932,430]]){
   await page.setViewportSize({width,height});
   check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${width}px question view has no overflow`);
   check(await page.locator('.option').first().evaluate(e=>e.getBoundingClientRect().height>=44),`${width}px answer choices are touch sized`);
   check(await page.locator('.qjump').first().evaluate(e=>e.getBoundingClientRect().height>=44),`${width}px question map is touch sized`);
   await page.locator('#questionStem').scrollIntoViewIfNeeded();await page.screenshot({path:path.join(OUT,`question-${width}.png`)});
  }
  await page.setViewportSize({width:390,height:844});
  await page.locator(`input[name="answer"][value="${section.items[0].correct}"]`).check();
  check(await page.locator('#timerState').innerText()==='Running','first answer starts the timer');
  await page.locator('#nextBtn').tap();check((await page.locator('.question-top').innerText()).includes('Question 2'),'Next advances the question');
  const wrong=['A','B','C','D'].find(x=>x!==section.items[1].correct);await page.locator(`input[name="answer"][value="${wrong}"]`).check();await page.locator('#flagBtn').tap();
  check(await page.locator('#flagBtn').getAttribute('aria-pressed')==='true','flags can be selected by touch');
  await page.reload();check(await page.locator('#answeredCount').innerText()==='2 / 200','answers restore after reload');
  check(await page.locator('#flagBtn').getAttribute('aria-pressed')==='true','flag restores after reload');
  await page.locator('.mobile-controls').tap();await page.locator('#submitBtn').tap();await page.locator('#confirmSubmit').tap();
  check((await page.locator('#results .score').innerText()).replace(/\s/g,'')==='1/200','scoring gives one point for the correct answer');
  check(await page.locator('.rationale').isVisible(),'answer explanations appear after scoring');
  check(await page.locator('input[name="answer"]').first().isDisabled(),'completed answers are locked');
  await page.locator('#reviewSelect').selectOption('incorrect');check((await page.locator('#reviewCount').innerText())==='1 question','incorrect review filter works');
  await page.locator('#reviewSelect').selectOption('unanswered');check((await page.locator('#reviewCount').innerText())==='198 questions','unanswered review filter works');
  await page.locator('#reviewSelect').selectOption('flagged');check((await page.locator('#reviewCount').innerText())==='1 question','flagged review filter works');
  await page.locator('#reviewSelect').selectOption('all');await page.locator('#jumpNumber').fill('1');await page.locator('#jumpForm button').tap();
  check((await page.locator('.question-top').innerText()).includes('Question 1'),'question number jump works');
  check((await page.locator('.rationale').innerText()).includes(section.items[0].rationale.replace(/\*\*/g,'')),'original key rationale is displayed');
  await page.locator('#questionStem').scrollIntoViewIfNeeded();await page.screenshot({path:path.join(OUT,'answer-review.png')});
  const dlEvent=page.waitForEvent('download');await page.locator('#exportProgress').tap();const dl=await dlEvent;const backup=path.join(OUT,'progress.json');await dl.saveAs(backup);
  check(JSON.parse(fs.readFileSync(backup)).brand==="sphi",'progress backup is isolated to the St Paul edition');
  await page.locator('#retakeBtn').tap();await page.locator('#confirmRestart').tap();check(await page.locator('#answeredCount').innerText()==='0 / 200','new attempt resets answers');
  await page.locator('#progressFile').setInputFiles(backup);await page.locator('#confirmImport').tap();
  check((await page.locator('#results .score').innerText()).replace(/\s/g,'')==='1/200','progress backup restores the score');
  await page.reload();check((await page.locator('#results .score').innerText()).replace(/\s/g,'')==='1/200','completed score survives reload');
  await page.keyboard.press('Tab');check(await page.evaluate(()=>document.activeElement!==document.body),'keyboard navigation reaches a control');
  const desktop=await browser.newContext({viewport:{width:1440,height:1000}});await desktop.setOffline(true);const dp=await desktop.newPage();dp.on('pageerror',e=>errors.push(e.message));await dp.goto(page.url());
  check(await dp.locator('.exam-card').count()===33,'desktop library loads all sections');await dp.screenshot({path:path.join(OUT,'desktop-library.png')});
  await dp.locator('.suite-link').click();await dp.waitForFunction(()=>globalThis.SphiExamMaker?.ready);
  check((await dp.title()).includes("St. Paul's Iloilo"),'library link opens the St Paul exam maker');
  check((await dp.locator('.footer').innerText()).includes('(c) jstiosin 2026'),'exam maker footer includes the exact credit');
  await dp.locator('.suite-link').click();await dp.locator('.exam-card').first().waitFor();check(await dp.locator('.exam-card').count()===33,'exam maker links back to the question bank');
  check(errors.length===0,'no browser runtime errors');check(requests.length===0,'no network requests in the study workflow');
  fs.writeFileSync(path.join(OUT,'results.json'),JSON.stringify({checks,errors,requests},null,2));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);fs.writeFileSync(path.join(OUT,'results.json'),JSON.stringify({checks,error:e.message},null,2));process.exitCode=1;});
