(()=>{'use strict';
const $=id=>document.getElementById(id);
const RAW='https://raw.githubusercontent.com/mohamedatef90/exercise-library/main/gifs/';
const GIF={
 ankle:'uL9CsKm.gif',squatTwist:'5BZHW9s.gif',push:'I4hDWkc.gif',wall:'LEH9jxP.gif',dead:'iny3m5y.gif',
 lungeTwist:'K9VL0Jq.gif',walkLunge:'IZVHb27.gif',calf1:'0jp9Rlz.gif',bike:'1ZFqTDN.gif',side:'KhHJ338.gif',
 quad4:'qBcKorM.gif',situp:'NAkmgdx.gif',seatedLeg:'Hgs6Nl1.gif',gluteStretch:'DeDThfG.gif'
};
const media=k=>RAW+(GIF[k]||GIF.wall);
const EX={
 ankle:{name:'Круги стопой',gif:'ankle',muscle:'ГОЛЕНОСТОП • ИКРЫ',cue:'Вращай стопу плавно. Колено и корпус остаются неподвижными.',tempo:'3 • 3',cycle:6,labels:['КРУГ','СМЕНА','КРУГ']},
 squatTwist:{name:'Присед + подъём рук и поворот',gif:'squatTwist',muscle:'НОГИ • ЯГОДИЦЫ • CORE',cue:'Сначала присед, затем выпрямление и контролируемый поворот корпуса. Не скручивай колени.',tempo:'2 • 1 • 2',cycle:5,labels:['ВНИЗ','ПАУЗА','ВВЕРХ']},
 push:{name:'Отжимания',gif:'push',muscle:'ГРУДЬ • ТРИЦЕПС • CORE',cue:'От головы до пяток одна линия. Опускай грудь контролируемо, локти не разводи широко.',tempo:'2 • 1 • 2',cycle:5,labels:['ВНИЗ','ПАУЗА','ВВЕРХ']},
 wall:{name:'Отжимания от стены',gif:'wall',muscle:'ГРУДЬ • ТРИЦЕПС',cue:'Стопы не двигаются. Корпус прямой. Грудь идёт к стене, затем спокойный жим назад.',tempo:'2 • 1 • 2',cycle:5,labels:['К СТЕНЕ','ПАУЗА','НАЗАД']},
 dead:{name:'Dead bug',gif:'dead',muscle:'ПРЕСС • СТАБИЛИЗАТОРЫ',cue:'Поясница прижата. Медленно вытяни противоположные руку и ногу и верни их без рывка.',tempo:'2 • 1 • 2',cycle:5,labels:['ВЫТЯНИ','ПАУЗА','ВЕРНИ']},
 lungeTwist:{name:'Выпад с поворотом',gif:'lungeTwist',muscle:'НОГИ • ЯГОДИЦЫ • CORE',cue:'Сначала устойчивый выпад, потом поворот грудной клетки. Переднее колено смотрит по линии стопы.',tempo:'2 • 1 • 2',cycle:5,labels:['ВЫПАД','ПОВОРОТ','ВЕРНИСЬ']},
 walkLunge:{name:'Ходьба выпадами',gif:'walkLunge',muscle:'ЯГОДИЦЫ • БЁДРА',cue:'Длинный уверенный шаг. Мягко опускай заднее колено и поднимайся через пятку передней ноги.',tempo:'2 • 1 • 2',cycle:5,labels:['ШАГ','ВНИЗ','ВСТАТЬ']},
 calf1:{name:'Подъём на носок одной ноги',gif:'calf1',muscle:'ИКРЫ • ГОЛЕНОСТОП',cue:'Поднимись максимально высоко, коротко задержись и медленно опустись. В chair-день держись за спинку стула.',tempo:'2 • 1 • 2',cycle:5,labels:['ВВЕРХ','ПАУЗА','ВНИЗ']},
 bike:{name:'Велосипед',gif:'bike',muscle:'ПРЕСС • СГИБАТЕЛИ БЕДРА',cue:'Поворачивай грудную клетку, а не тяни голову руками. Движение ровное, без ускорения.',tempo:'1 • 1',cycle:2,labels:['ЛЕВО','ЦЕНТР','ПРАВО']},
 side:{name:'Отжимание → боковая планка',gif:'side',muscle:'ГРУДЬ • ПЛЕЧИ • CORE',cue:'Закончи отжимание и только потом раскрой корпус. Таз не провисает.',tempo:'2 • 1 • 2',cycle:5,labels:['ВНИЗ','ЖИМ','РАСКРОЙ']},
 quad4:{name:'Растяжка квадрицепса на четвереньках',gif:'quad4',muscle:'ПЕРЕДНЯЯ ПОВЕРХНОСТЬ БЕДРА',cue:'Двигайся медленно только до мягкого натяжения. Не пружинь и не работай через боль.',tempo:'ПЛАВНО',cycle:6,labels:['ВХОД','ДЫШИ','ВЫХОД']},
 situp:{name:'Подъём корпуса с руками вверх',gif:'situp',muscle:'ПРЕСС • СГИБАТЕЛИ БЕДРА',cue:'Поднимай корпус постепенно. Не дёргай шею и не бросай спину при опускании.',tempo:'2 • 1 • 2',cycle:5,labels:['ВВЕРХ','ПАУЗА','ВНИЗ']},
 seatedLeg:{name:'Подъём прямых ног сидя',gif:'seatedLeg',muscle:'ПРЕСС • СГИБАТЕЛИ БЕДРА',cue:'Сядь устойчиво ближе к краю стула, держись за сиденье. Подними ноги под контролем и так же медленно опусти.',tempo:'2 • 1 • 2',cycle:5,labels:['ПОДНЯТЬ','ПАУЗА','ОПУСТИТЬ'],chair:true},
 gluteStretch:{name:'Растяжка ягодичных сидя',gif:'gluteStretch',muscle:'ЯГОДИЦЫ • ТАЗОБЕДРЕННЫЙ',cue:'Спина длинная. Наклоняйся мягко до натяжения, а не до боли. Не пружинь.',tempo:'ПЛАВНО',cycle:6,labels:['НАКЛОН','ДЫШИ','ВЕРНИСЬ'],chair:true},
 breath:{name:'Спокойное дыхание',gif:'gluteStretch',muscle:'ВОССТАНОВЛЕНИЕ',cue:'Вдох носом 4 секунды, выдох 6 секунд. Плечи расслаблены.',tempo:'4 • 6',cycle:10,labels:['ВДОХ','СПОКОЙНО','ВЫДОХ']}
};
const DAY_NAMES=['Full Body','Chair: ноги + core','Верх + core','Мобильность','Full Body +','Chair Conditioning','Восстановление'];
const DAY_SUB=['Классическая калистеника','Низкоударная работа со стулом','Грудь, плечи и корпус','Амплитуда, контроль и гибкость','Плотнее, но без прыжков','Пульс + ноги + корпус со стулом','Мягкий день без гонки'];
const CHAIR_DAYS=new Set([1,5]);
const DAY_EX=[
 ['squatTwist','wall','dead','lungeTwist','push','calf1','bike','walkLunge','dead','push'],
 ['seatedLeg','wall','calf1','seatedLeg','dead','squatTwist','seatedLeg','calf1','gluteStretch','wall'],
 ['wall','dead','push','bike','side','wall','situp','push','dead','side'],
 ['ankle','gluteStretch','dead','quad4','ankle','lungeTwist','gluteStretch','dead','breath','quad4'],
 ['squatTwist','push','lungeTwist','dead','side','walkLunge','push','bike','squatTwist','dead'],
 ['seatedLeg','wall','squatTwist','calf1','seatedLeg','dead','wall','seatedLeg','calf1','gluteStretch'],
 ['ankle','gluteStretch','dead','breath','ankle','quad4','dead','breath','gluteStretch','quad4']
];
const DAYS=['Пн','Вт','Ср','Чт','Пт','Сб','Вс'];
const progression=[{w:30,r:30},{w:30,r:30},{w:35,r:25},{w:35,r:25},{w:40,r:20},{w:40,r:20},{w:45,r:15},{w:45,r:15}];
let selectedDay=Math.max(0,(new Date().getDay()+6)%7),selectedWeek=Math.min(7,Math.max(0,Number(localStorage.getItem('m15-week')||1)-1));
let routine=[],idx=0,remaining=0,running=false,deadline=0,timer=null,totalElapsed=0,sound=true,wake=null;
const done=()=>{try{return JSON.parse(localStorage.getItem('m15-done')||'{}')}catch(e){return {}}};
const saveDone=o=>localStorage.setItem('m15-done',JSON.stringify(o));
const fmt=s=>`${String(Math.floor(Math.max(0,s)/60)).padStart(2,'0')}:${String(Math.ceil(Math.max(0,s)%60)).padStart(2,'0')}`;
const preload=()=>[...new Set(Object.values(GIF))].forEach(f=>{const i=new Image();i.src=RAW+f});
function buildRoutine(){
 const p=progression[selectedWeek];
 const warm=CHAIR_DAYS.has(selectedDay)?[['ankle',40],['wall',40],['seatedLeg',40]]:[['ankle',40],['squatTwist',40],['wall',40]];
 const cool=CHAIR_DAYS.has(selectedDay)?[['gluteStretch',60],['ankle',60],['breath',60]]:[['quad4',60],['dead',60],['breath',60]];
 const out=[];warm.forEach(([k,d])=>out.push({type:'warm',key:k,d}));DAY_EX[selectedDay].forEach(k=>{out.push({type:'work',key:k,d:p.w});out.push({type:'rest',key:k,d:p.r})});cool.forEach(([k,d])=>out.push({type:'cool',key:k,d}));return out;
}
function renderHome(){
 $('weekTabs').innerHTML=Array.from({length:8},(_,i)=>`<button class="${i===selectedWeek?'active':''}" data-w="${i}">${i+1}</button>`).join('');
 $('weekTabs').querySelectorAll('button').forEach(b=>b.onclick=()=>{selectedWeek=+b.dataset.w;localStorage.setItem('m15-week',selectedWeek+1);renderHome()});
 const d=done();$('days').innerHTML=DAYS.map((x,i)=>{const key=`${selectedWeek+1}-${i}`;return `<button class="day ${i===selectedDay?'active':''} ${d[key]?'done':''}" data-d="${i}"><b>${x}</b><small>${d[key]?'✓':'15м'}</small></button>`}).join('');
 $('days').querySelectorAll('button').forEach(b=>b.onclick=()=>{selectedDay=+b.dataset.d;renderHome()});
 $('planName').textContent=DAY_NAMES[selectedDay];$('planMeta').textContent=`Неделя ${selectedWeek+1} • ${DAY_SUB[selectedDay]} • 15:00`;
 $('equipment').textContent=CHAIR_DAYS.has(selectedDay)?'🪑 НУЖЕН УСТОЙЧИВЫЙ СТУЛ':'✓ БЕЗ ОБОРУДОВАНИЯ';
 $('level').textContent=selectedWeek<2?'База':selectedWeek<4?'Прогресс':selectedWeek<6?'Сила':'Плотность';
 const all=done(),total=Object.values(all).filter(Boolean).length;$('totalDone').textContent=total;$('weekDone').textContent=`${DAYS.filter((_,i)=>all[`${selectedWeek+1}-${i}`]).length} / 7`;
 const uniq=[];DAY_EX[selectedDay].forEach(k=>{if(!uniq.includes(k)&&uniq.length<6)uniq.push(k)});
 $('list').innerHTML=uniq.map(k=>`<div class="row"><div class="thumb"><img src="${media(EX[k].gif)}" alt="${EX[k].name}"></div><div><b>${EX[k].name}</b><span>${EX[k].muscle} · ритм ${EX[k].tempo}</span></div><span>→</span></div>`).join('');
}
function speak(t){if(!sound||!('speechSynthesis'in window))return;try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='ru-RU';u.rate=.98;speechSynthesis.speak(u)}catch(e){}}
async function lockWake(){try{if('wakeLock'in navigator)wake=await navigator.wakeLock.request('screen')}catch(e){}}
function unlockWake(){try{wake&&wake.release()}catch(e){}wake=null}
function start(){routine=buildRoutine();idx=0;totalElapsed=0;$('player').classList.add('show');document.body.style.overflow='hidden';lockWake();loadStep(true)}
function loadStep(auto=false){clearInterval(timer);const s=routine[idx];remaining=s.d;running=true;deadline=Date.now()+remaining*1000;renderPlayer();if(auto)speak(s.type==='rest'?'Отдых':EX[s.key].name);timer=setInterval(tick,100)}
function tick(){if(!running)return;remaining=Math.max(0,(deadline-Date.now())/1000);if(remaining<=0){totalElapsed+=routine[idx].d;if(idx<routine.length-1){idx++;loadStep(true)}else finish()}else renderClock()}
function renderClock(){$('remain').textContent=fmt(remaining);$('elapsed').textContent=fmt(totalElapsed+(routine[idx].d-remaining))}
function setTempo(ex,isRest){
 $('tempoText').textContent=isRest?'СПОКОЙНО':ex.tempo;$('repHint').textContent=isRest?'восстанови дыхание':'двигайся под индикатор';
 $('tempoA').textContent=isRest?'ВДОХ':ex.labels[0];$('tempoB').textContent=isRest?'РАССЛАБЬСЯ':ex.labels[1];$('tempoC').textContent=isRest?'ВЫДОХ':ex.labels[2];
 const dot=$('tempoDot');dot.style.animationDuration=`${isRest?6:ex.cycle}s`;$('tempoBox').classList.toggle('paused',!running);
}
function renderPlayer(){
 const s=routine[idx],ex=EX[s.key],isRest=s.type==='rest';$('media').classList.toggle('resting',isRest);
 $('demo').src=media(ex.gif);$('demo').alt=ex.name;$('demo').onerror=()=>{$('demo').src=media('wall')};
 $('exerciseTitle').textContent=isRest?'Отдых':ex.name;$('phase').textContent=s.type==='warm'?'РАЗМИНКА':s.type==='work'?'РАБОТА':s.type==='rest'?'ВОССТАНОВЛЕНИЕ':'ЗАМИНКА';
 $('muscleBadge').textContent=isRest?'СЛЕДУЮЩЕЕ ДВИЖЕНИЕ':ex.muscle;$('cue').textContent=isRest?'Не садись без необходимости. Дыши спокойно. Следующее: '+ex.name:ex.cue;
 $('restName').textContent='Следующее: '+ex.name;$('stepCount').textContent=`${idx+1}/${routine.length}`;$('pauseBtn').textContent='Ⅱ';setTempo(ex,isRest);
 $('progress').innerHTML=routine.map((_,i)=>`<i class="${i<idx?'done':i===idx?'now':''}"></i>`).join('');
 const n=routine[Math.min(idx+1,routine.length-1)],nx=EX[n.key];$('nextImg').src=media(nx.gif);$('nextName').textContent=idx===routine.length-1?'Финиш':(n.type==='rest'?'Отдых':nx.name);$('nextTime').textContent=idx===routine.length-1?'':`${n.d} сек · ${nx.tempo}`;renderClock();
}
function toggle(){if(running){remaining=Math.max(0,(deadline-Date.now())/1000);running=false;$('pauseBtn').textContent='▶';$('tempoBox').classList.add('paused');clearInterval(timer);speak('Пауза')}else{running=true;deadline=Date.now()+remaining*1000;$('pauseBtn').textContent='Ⅱ';$('tempoBox').classList.remove('paused');timer=setInterval(tick,100);speak('Продолжаем')}}
function next(){totalElapsed+=Math.max(0,routine[idx].d-remaining);if(idx<routine.length-1){idx++;loadStep(true)}else finish()}
function prev(){if(idx>0){idx--;loadStep(false)}}
function finish(){clearInterval(timer);running=false;unlockWake();const d=done();d[`${selectedWeek+1}-${selectedDay}`]=true;saveDone(d);$('controlPanel').innerHTML=`<div class="finish"><div class="mark">✓</div><h2>15 минут готово</h2><p>Неделя ${selectedWeek+1} • ${DAY_NAMES[selectedDay]}</p><button id="finishBtn">ГОТОВО</button></div>`;$('finishBtn').onclick=closePlayer;speak('Тренировка завершена')}
function closePlayer(){clearInterval(timer);running=false;unlockWake();$('player').classList.remove('show');document.body.style.overflow='';location.reload()}
$('startBtn').onclick=start;$('pauseBtn').onclick=toggle;$('nextBtn').onclick=next;$('prevBtn').onclick=prev;$('closeBtn').onclick=closePlayer;$('soundBtn').onclick=()=>{sound=!sound;$('soundBtn').textContent=sound?'🔊':'🔇'};
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'&&running){remaining=Math.max(0,(deadline-Date.now())/1000);renderClock()}});
if('serviceWorker'in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));preload();renderHome();
})();