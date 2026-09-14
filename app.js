(()=>{'use strict';
const $=id=>document.getElementById(id);
const EX={
 ankle:{name:'Круги стопой',muscle:'ГОЛЕНОСТОП • ИКРЫ',cue:'Опора стабильная. Вращай стопу медленно по полной удобной окружности.',tempo:'6 СЕК / КРУГ',labels:['КРУГ','СМЕНА','КРУГ']},
 squat:{name:'Приседания',muscle:'НОГИ • ЯГОДИЦЫ • CORE',cue:'Таз назад, колени по линии стоп. Вниз и вверх с одинаковым контролем.',tempo:'2 • 1 • 2',labels:['ВНИЗ','ПАУЗА','ВВЕРХ']},
 wall:{name:'Отжимания от стены',muscle:'ГРУДЬ • ТРИЦЕПС',cue:'Корпус прямой. Грудь идёт к стене, затем спокойный жим назад.',tempo:'2 • 1 • 2',labels:['К СТЕНЕ','ПАУЗА','НАЗАД']},
 push:{name:'Отжимания',muscle:'ГРУДЬ • ТРИЦЕПС • CORE',cue:'От головы до пяток одна линия. Не падай вниз и не выстреливай вверх.',tempo:'2 • 1 • 2',labels:['ВНИЗ','ПАУЗА','ВВЕРХ']},
 dead:{name:'Dead bug',muscle:'ПРЕСС • СТАБИЛИЗАТОРЫ',cue:'Поясница прижата. Противоположные рука и нога двигаются медленно и одновременно.',tempo:'2 • 1 • 2',labels:['ВЫТЯНИ','ПАУЗА','ВЕРНИ']},
 lunge:{name:'Обратные выпады',muscle:'НОГИ • ЯГОДИЦЫ',cue:'Шаг назад, таз вниз. Переднее колено остаётся по линии стопы.',tempo:'2 • 1 • 2',labels:['ШАГ','ВНИЗ','ВСТАТЬ']},
 calf:{name:'Подъём на носки',muscle:'ИКРЫ • ГОЛЕНОСТОП',cue:'Поднимись высоко, задержись и опустись медленнее, чем поднимался.',tempo:'2 • 1 • 2',labels:['ВВЕРХ','ПАУЗА','ВНИЗ']},
 bike:{name:'Велосипед',muscle:'ПРЕСС • CORE',cue:'Не тяни шею руками. Поворачивай грудную клетку и меняй стороны ровно.',tempo:'РИТМ 1 • 1',labels:['ЛЕВО','ЦЕНТР','ПРАВО']},
 situp:{name:'Подъём корпуса',muscle:'ПРЕСС',cue:'Поднимай корпус постепенно. Не дёргай шею и не бросай спину на пол.',tempo:'2 • 1 • 2',labels:['ВВЕРХ','ПАУЗА','ВНИЗ']},
 seatedMarch:{name:'Марш сидя',muscle:'БЁДРА • CORE',cue:'Сиди высоко. Поднимай колени по очереди без раскачивания корпуса.',tempo:'1 • 1',labels:['ЛЕВО','ЦЕНТР','ПРАВО'],chair:true},
 seatedKnee:{name:'Разгибание колена сидя',muscle:'КВАДРИЦЕПС • БЁДРА',cue:'Бедро остаётся на месте. Выпрями голень, задержись и верни под контролем.',tempo:'2 • 1 • 2',labels:['ВЫПРЯМИ','ПАУЗА','ВЕРНИ'],chair:true},
 seatedTwist:{name:'Повороты корпуса сидя',muscle:'КОСЫЕ • CORE',cue:'Таз остаётся на стуле. Поворачивай грудную клетку, а не только руки.',tempo:'2 • 1 • 2',labels:['ЛЕВО','ЦЕНТР','ПРАВО'],chair:true},
 seatedCalf:{name:'Подъём пяток сидя',muscle:'ИКРЫ',cue:'Носки остаются на полу. Подними обе пятки, коротко задержись и опусти.',tempo:'2 • 1 • 2',labels:['ВВЕРХ','ПАУЗА','ВНИЗ'],chair:true},
 sitStand:{name:'Вставание со стула',muscle:'ЯГОДИЦЫ • БЁДРА',cue:'Наклони корпус чуть вперёд, встань через стопы и садись обратно без падения.',tempo:'2 • 1 • 2',labels:['ВСТАТЬ','ПАУЗА','СЕСТЬ'],chair:true},
 gluteStretch:{name:'Растяжка ягодичных сидя',muscle:'ЯГОДИЦЫ • ТАЗОБЕДРЕННЫЙ',cue:'Спина длинная. Наклоняйся мягко только до комфортного натяжения.',tempo:'МЕДЛЕННО',labels:['НАКЛОН','ДЫШИ','ВЕРНИСЬ'],chair:true},
 breath:{name:'Спокойное дыхание',muscle:'ВОССТАНОВЛЕНИЕ',cue:'Вдох носом 4 секунды, выдох 6 секунд. Плечи и челюсть расслаблены.',tempo:'4 • 6',labels:['ВДОХ','СПОКОЙНО','ВЫДОХ']}
};
const DAY_NAMES=['Full Body','Chair: ноги + core','Верх + core','Мобильность','Full Body +','Chair Conditioning','Восстановление'];
const DAY_SUB=['Сила, контроль и пульс','Низкоударная работа со стулом','Грудь, руки и корпус','Мягкая амплитуда и контроль','Плотнее, но без прыжков','Пульс и ноги со стулом','Спокойный день'];
const CHAIR_DAYS=new Set([1,5]);
const DAY_EX=[
 ['squat','wall','lunge','dead','push','calf','bike','squat','wall','dead'],
 ['sitStand','seatedMarch','seatedKnee','seatedTwist','seatedCalf','sitStand','seatedMarch','seatedKnee','seatedTwist','seatedCalf'],
 ['wall','push','dead','bike','situp','wall','push','dead','bike','situp'],
 ['ankle','gluteStretch','dead','breath','ankle','gluteStretch','lunge','dead','breath','gluteStretch'],
 ['squat','push','lunge','bike','dead','squat','push','lunge','calf','bike'],
 ['sitStand','seatedMarch','seatedTwist','seatedKnee','seatedCalf','sitStand','seatedMarch','seatedTwist','seatedKnee','seatedCalf'],
 ['ankle','gluteStretch','dead','breath','ankle','gluteStretch','dead','breath','gluteStretch','ankle']
];
const DAYS=['Пн','Вт','Ср','Чт','Пт','Сб','Вс'];
const progression=[{w:30,r:30},{w:30,r:30},{w:35,r:25},{w:35,r:25},{w:40,r:20},{w:40,r:20},{w:45,r:15},{w:45,r:15}];
let selectedDay=Math.max(0,(new Date().getDay()+6)%7),selectedWeek=Math.min(7,Math.max(0,Number(localStorage.getItem('m15-week')||1)-1));
let routine=[],idx=0,remaining=0,running=false,deadline=0,timer=null,totalElapsed=0,sound=true,wake=null,motion=null;
const done=()=>{try{return JSON.parse(localStorage.getItem('m15-done')||'{}')}catch(e){return {}}};
const saveDone=o=>localStorage.setItem('m15-done',JSON.stringify(o));
const fmt=s=>`${String(Math.floor(Math.max(0,s)/60)).padStart(2,'0')}:${String(Math.ceil(Math.max(0,s)%60)).padStart(2,'0')}`;
function buildRoutine(){
 const p=progression[selectedWeek];
 const warm=CHAIR_DAYS.has(selectedDay)?[['ankle',40],['seatedMarch',40],['wall',40]]:[['ankle',40],['squat',40],['wall',40]];
 const cool=CHAIR_DAYS.has(selectedDay)?[['gluteStretch',60],['seatedCalf',60],['breath',60]]:[['gluteStretch',60],['dead',60],['breath',60]];
 const out=[];warm.forEach(([k,d])=>out.push({type:'warm',key:k,d}));
 DAY_EX[selectedDay].forEach(k=>{out.push({type:'work',key:k,d:p.w});out.push({type:'rest',key:k,d:p.r})});
 cool.forEach(([k,d])=>out.push({type:'cool',key:k,d}));return out;
}
function thumb(k){return `<div class="thumb">${M15Motion.staticSvg(k)}</div>`}
function renderHome(){
 $('weekTabs').innerHTML=Array.from({length:8},(_,i)=>`<button class="${i===selectedWeek?'active':''}" data-w="${i}">${i+1}</button>`).join('');
 $('weekTabs').querySelectorAll('button').forEach(b=>b.onclick=()=>{selectedWeek=+b.dataset.w;localStorage.setItem('m15-week',selectedWeek+1);renderHome()});
 const d=done();$('days').innerHTML=DAYS.map((x,i)=>{const key=`${selectedWeek+1}-${i}`;return `<button class="day ${i===selectedDay?'active':''} ${d[key]?'done':''}" data-d="${i}"><b>${x}</b><small>${d[key]?'✓':'15м'}</small></button>`}).join('');
 $('days').querySelectorAll('button').forEach(b=>b.onclick=()=>{selectedDay=+b.dataset.d;renderHome()});
 $('planName').textContent=DAY_NAMES[selectedDay];$('planMeta').textContent=`Неделя ${selectedWeek+1} • ${DAY_SUB[selectedDay]} • ровно 15:00`;
 $('equipment').textContent=CHAIR_DAYS.has(selectedDay)?'🪑 УСТОЙЧИВЫЙ СТУЛ БЕЗ КОЛЁС':'✓ БЕЗ ОБОРУДОВАНИЯ';
 $('level').textContent=selectedWeek<2?'База':selectedWeek<4?'Прогресс':selectedWeek<6?'Сила':'Плотность';
 const all=done(),total=Object.values(all).filter(Boolean).length;$('totalDone').textContent=total;$('weekDone').textContent=`${DAYS.filter((_,i)=>all[`${selectedWeek+1}-${i}`]).length} / 7`;
 const uniq=[];DAY_EX[selectedDay].forEach(k=>{if(!uniq.includes(k)&&uniq.length<6)uniq.push(k)});
 $('list').innerHTML=uniq.map(k=>`<div class="row">${thumb(k)}<div><b>${EX[k].name}</b><span>${EX[k].muscle} · ${EX[k].tempo}</span></div><span>→</span></div>`).join('');
}
function speak(t){if(!sound||!('speechSynthesis'in window))return;try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='ru-RU';u.rate=.96;speechSynthesis.speak(u)}catch(e){}}
async function lockWake(){try{if('wakeLock'in navigator)wake=await navigator.wakeLock.request('screen')}catch(e){}}
function unlockWake(){try{wake&&wake.release()}catch(e){}wake=null}
function start(){routine=buildRoutine();idx=0;totalElapsed=0;$('player').classList.add('show');document.body.style.overflow='hidden';lockWake();loadStep(true)}
function loadStep(auto=false){clearInterval(timer);const s=routine[idx];remaining=s.d;running=true;deadline=Date.now()+remaining*1000;renderPlayer();if(auto)speak(s.type==='rest'?'Отдых':EX[s.key].name);timer=setInterval(tick,100)}
function tick(){if(!running)return;remaining=Math.max(0,(deadline-Date.now())/1000);if(remaining<=0){totalElapsed+=routine[idx].d;if(idx<routine.length-1){idx++;loadStep(true)}else finish()}else renderClock()}
function renderClock(){$('remain').textContent=fmt(remaining);$('elapsed').textContent=fmt(totalElapsed+(routine[idx].d-remaining))}
function setTempo(ex,isRest){
 $('tempoText').textContent=isRest?'СПОКОЙНО':ex.tempo;$('repHint').textContent=isRest?'восстанови дыхание':'повторяй в этом ритме';
 $('tempoA').textContent=isRest?'ВДОХ':ex.labels[0];$('tempoB').textContent=isRest?'СПОКОЙНО':ex.labels[1];$('tempoC').textContent=isRest?'ВЫДОХ':ex.labels[2];
 $('tempoBox').classList.toggle('paused',!running);
}
function renderMotion(key,isRest){
 if(motion)motion.destroy();
 motion=M15Motion.mount($('demo'),key,{paused:isRest||!running});
 $('media').classList.toggle('resting',isRest);
}
function renderNext(k){const el=$('nextImg');el.innerHTML=M15Motion.staticSvg(k)}
function renderPlayer(){
 const s=routine[idx],ex=EX[s.key],isRest=s.type==='rest';
 renderMotion(s.key,isRest);$('exerciseTitle').textContent=isRest?'Отдых':ex.name;
 $('phase').textContent=s.type==='warm'?'РАЗМИНКА':s.type==='work'?'РАБОТА':s.type==='rest'?'ВОССТАНОВЛЕНИЕ':'ЗАМИНКА';
 $('muscleBadge').textContent=isRest?'ВОССТАНОВЛЕНИЕ':ex.muscle;
 $('cue').textContent=isRest?'Восстанови дыхание. Следующее: '+ex.name:ex.cue;
 $('restName').textContent='Следующее: '+ex.name;$('stepCount').textContent=`${idx+1}/${routine.length}`;$('pauseBtn').textContent='Ⅱ';
 $('progress').innerHTML=routine.map((_,i)=>`<i class="${i<idx?'done':i===idx?'now':''}"></i>`).join('');
 const n=routine[Math.min(idx+1,routine.length-1)],nx=EX[n.key];renderNext(n.key);
 $('nextName').textContent=idx===routine.length-1?'Финиш':(n.type==='rest'?'Отдых':nx.name);$('nextTime').textContent=idx===routine.length-1?'':`${n.d} сек`;
 setTempo(ex,isRest);renderClock();
}
function toggle(){
 if(running){remaining=Math.max(0,(deadline-Date.now())/1000);running=false;$('pauseBtn').textContent='▶';clearInterval(timer);$('tempoBox').classList.add('paused');motion&&motion.pause();speak('Пауза')}
 else{running=true;deadline=Date.now()+remaining*1000;$('pauseBtn').textContent='Ⅱ';timer=setInterval(tick,100);$('tempoBox').classList.remove('paused');motion&&motion.resume();speak('Продолжаем')}
}
function next(){totalElapsed+=Math.max(0,routine[idx].d-remaining);if(idx<routine.length-1){idx++;loadStep(true)}else finish()}
function prev(){if(idx>0){idx--;loadStep(false)}}
function finish(){
 clearInterval(timer);running=false;unlockWake();motion&&motion.destroy();motion=null;
 const d=done();d[`${selectedWeek+1}-${selectedDay}`]=true;saveDone(d);
 $('controlPanel').innerHTML=`<div class="finish"><div class="mark">✓</div><h2>15 минут готово</h2><p>Неделя ${selectedWeek+1} • ${DAY_NAMES[selectedDay]}</p><button id="finishBtn">ГОТОВО</button></div>`;
 $('finishBtn').onclick=closePlayer;speak('Тренировка завершена');
}
function closePlayer(){clearInterval(timer);running=false;unlockWake();motion&&motion.destroy();motion=null;$('player').classList.remove('show');document.body.style.overflow='';location.reload()}
$('startBtn').onclick=start;$('pauseBtn').onclick=toggle;$('nextBtn').onclick=next;$('prevBtn').onclick=prev;$('closeBtn').onclick=closePlayer;$('soundBtn').onclick=()=>{sound=!sound;$('soundBtn').textContent=sound?'🔊':'🔇'};
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'&&running){remaining=Math.max(0,(deadline-Date.now())/1000);renderClock()}});
if('serviceWorker'in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
renderHome();
})();