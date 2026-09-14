(()=>{'use strict';
const $=id=>document.getElementById(id);
const RAW='https://raw.githubusercontent.com/mohamedatef90/exercise-library/main/gifs/';
const GIF={ankle:'uL9CsKm.gif',squat:'5BZHW9s.gif',push:'I4hDWkc.gif',wall:'LEH9jxP.gif',dead:'iny3m5y.gif',lunge:'K9VL0Jq.gif',walkLunge:'IZVHb27.gif',calf:'0jp9Rlz.gif',bike:'1ZFqTDN.gif',side:'KhHJ338.gif',quad:'qBcKorM.gif',situp:'NAkmgdx.gif',archer:'A9qxk2F.gif'};
const media=k=>RAW+(GIF[k]||GIF.squat);
const EX={
 ankle:{name:'Круги стопой',gif:'ankle',cue:'Медленно вращай голеностоп, без рывков.'},
 squat:{name:'Присед + подъём рук',gif:'squat',cue:'Колени идут по линии стоп, корпус собран.'},
 push:{name:'Отжимания',gif:'push',cue:'Тело одной линией. Локти не разводи слишком широко.'},
 wall:{name:'Отжимания от стены',gif:'wall',cue:'Лёгкая версия: корпус прямой, движение контролируемое.'},
 dead:{name:'Dead bug',gif:'dead',cue:'Поясница прижата, двигай противоположные руку и ногу.'},
 lunge:{name:'Выпад с поворотом',gif:'lunge',cue:'Переднее колено над стопой, поворот идёт грудной клеткой.'},
 walkLunge:{name:'Ходьба выпадами',gif:'walkLunge',cue:'Шаг достаточно длинный, толкайся пяткой передней ноги.'},
 calf:{name:'Подъём на носок',gif:'calf',cue:'Поднимайся максимально высоко, опускайся медленно.'},
 bike:{name:'Велосипед',gif:'bike',cue:'Не тяни голову руками. Поворачивай грудную клетку.'},
 side:{name:'Отжимание + боковая планка',gif:'side',cue:'После отжимания раскрой корпус и удержи таз высоким.'},
 quad:{name:'Растяжка квадрицепса',gif:'quad',cue:'Двигайся мягко, без боли. Дыши спокойно.'},
 situp:{name:'Подъём корпуса',gif:'situp',cue:'Поднимайся за счёт корпуса, не дёргай шею.'},
 archer:{name:'Лучник-отжимание',gif:'archer',cue:'Сложная версия. Используй только при уверенной технике.'},
 breath:{name:'Дыхание',gif:'quad',cue:'Вдох носом 4 секунды, длинный выдох 6 секунд.'}
};
const DAY_NAMES=['Всё тело','Ноги + корпус','Верх + core','Мобильность','Всё тело +','Кондиция','Восстановление'];
const DAY_SUB=['Баланс силы и пульса','Ноги, ягодицы, стабильность','Грудь, плечи, пресс','Лёгкий день и амплитуда','Больше плотности','Пульс без прыжков','Мягкое восстановление'];
const DAY_EX=[
 ['squat','wall','dead','lunge','push','calf','bike','squat','dead','push'],
 ['squat','lunge','calf','dead','walkLunge','squat','bike','lunge','calf','dead'],
 ['wall','dead','push','bike','side','wall','situp','push','dead','side'],
 ['ankle','quad','dead','squat','ankle','quad','dead','lunge','breath','quad'],
 ['squat','push','lunge','dead','side','squat','push','bike','walkLunge','dead'],
 ['squat','bike','walkLunge','wall','calf','lunge','bike','squat','wall','dead'],
 ['ankle','quad','dead','breath','ankle','quad','dead','breath','squat','quad']
];
const DAYS=['Пн','Вт','Ср','Чт','Пт','Сб','Вс'];
const progression=[{w:30,r:30},{w:30,r:30},{w:35,r:25},{w:35,r:25},{w:40,r:20},{w:40,r:20},{w:45,r:15},{w:45,r:15}];
let selectedDay=Math.max(0,(new Date().getDay()+6)%7), selectedWeek=Number(localStorage.getItem('m15-week')||1)-1;
let routine=[],idx=0,remaining=0,running=false,deadline=0,timer=null,totalElapsed=0,sound=true,wake=null;
const done=()=>JSON.parse(localStorage.getItem('m15-done')||'{}');
const saveDone=o=>localStorage.setItem('m15-done',JSON.stringify(o));
const fmt=s=>`${String(Math.floor(s/60)).padStart(2,'0')}:${String(Math.max(0,Math.ceil(s%60))).padStart(2,'0')}`;
const preload=()=>Object.values(GIF).forEach(f=>{const i=new Image();i.src=RAW+f});
function buildRoutine(){const p=progression[selectedWeek];const warm=[['ankle',40],['squat',40],['wall',40]];const cool=[['quad',60],['dead',60],['breath',60]];const out=[];warm.forEach(([k,d])=>out.push({type:'warm',key:k,d}));DAY_EX[selectedDay].forEach(k=>{out.push({type:'work',key:k,d:p.w});out.push({type:'rest',key:k,d:p.r})});cool.forEach(([k,d])=>out.push({type:'cool',key:k,d}));return out}
function renderHome(){
 $('weekTabs').innerHTML=Array.from({length:8},(_,i)=>`<button class="${i===selectedWeek?'active':''}" data-w="${i}">${i+1}</button>`).join('');
 $('weekTabs').querySelectorAll('button').forEach(b=>b.onclick=()=>{selectedWeek=+b.dataset.w;localStorage.setItem('m15-week',selectedWeek+1);renderHome()});
 const d=done();$('days').innerHTML=DAYS.map((x,i)=>{const key=`${selectedWeek+1}-${i}`;return `<button class="day ${i===selectedDay?'active':''} ${d[key]?'done':''}" data-d="${i}"><b>${x}</b><small>${d[key]?'✓':'15м'}</small></button>`}).join('');
 $('days').querySelectorAll('button').forEach(b=>b.onclick=()=>{selectedDay=+b.dataset.d;renderHome()});
 $('planName').textContent=DAY_NAMES[selectedDay];$('planMeta').textContent=`Неделя ${selectedWeek+1} • ${DAY_SUB[selectedDay]} • ровно 15:00`;
 $('level').textContent=selectedWeek<2?'База':selectedWeek<4?'Прогресс':selectedWeek<6?'Сила':'Интенсивность';
 const all=done(),total=Object.values(all).filter(Boolean).length;$('totalDone').textContent=total;$('weekDone').textContent=`${DAYS.filter((_,i)=>all[`${selectedWeek+1}-${i}`]).length} / 7`;
 const uniq=[];DAY_EX[selectedDay].forEach(k=>{if(!uniq.includes(k)&&uniq.length<5)uniq.push(k)});$('list').innerHTML=uniq.map(k=>`<div class="row"><div class="thumb"><img src="${media(EX[k].gif)}" alt=""></div><div><b>${EX[k].name}</b><span>${EX[k].cue}</span></div><span>→</span></div>`).join('');
}
function speak(t){if(!sound||!('speechSynthesis'in window))return;try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='ru-RU';u.rate=1.05;speechSynthesis.speak(u)}catch(e){}}
async function lockWake(){try{if('wakeLock'in navigator)wake=await navigator.wakeLock.request('screen')}catch(e){}}
function unlockWake(){try{wake&&wake.release()}catch(e){}wake=null}
function start(){routine=buildRoutine();idx=0;totalElapsed=0;$('player').classList.add('show');document.body.style.overflow='hidden';lockWake();loadStep(true)}
function loadStep(auto=false){clearInterval(timer);const s=routine[idx];remaining=s.d;running=true;deadline=Date.now()+remaining*1000;renderPlayer();if(auto)speak(s.type==='rest'?'Отдых':EX[s.key].name);timer=setInterval(tick,100)}
function tick(){if(!running)return;remaining=Math.max(0,(deadline-Date.now())/1000);if(remaining<=0){totalElapsed+=routine[idx].d;if(idx<routine.length-1){idx++;loadStep(true)}else finish()}else renderClock()}
function renderClock(){$('remain').textContent=fmt(remaining);$('elapsed').textContent=fmt(totalElapsed+(routine[idx].d-remaining))}
function renderPlayer(){const s=routine[idx],ex=EX[s.key],isRest=s.type==='rest';$('media').classList.toggle('resting',isRest);$('demo').src=media(ex.gif);$('demo').alt=ex.name;$('exerciseTitle').textContent=isRest?'Отдых':ex.name;$('phase').textContent=s.type==='warm'?'РАЗМИНКА':s.type==='work'?'РАБОТА':s.type==='rest'?'ВОССТАНОВЛЕНИЕ':'ЗАМИНКА';$('cue').textContent=isRest?'Восстанови дыхание. Следующее: '+ex.name:ex.cue;$('restName').textContent='Следующее: '+ex.name;$('stepCount').textContent=`${idx+1}/${routine.length}`;$('pauseBtn').textContent='Ⅱ';
 $('progress').innerHTML=routine.map((_,i)=>`<i class="${i<idx?'done':i===idx?'now':''}"></i>`).join('');const n=routine[Math.min(idx+1,routine.length-1)],nx=EX[n.key];$('nextImg').src=media(nx.gif);$('nextName').textContent=idx===routine.length-1?'Финиш':(n.type==='rest'?'Отдых':nx.name);$('nextTime').textContent=idx===routine.length-1?'':`${n.d} сек`;renderClock()}
function toggle(){if(running){remaining=Math.max(0,(deadline-Date.now())/1000);running=false;$('pauseBtn').textContent='▶';clearInterval(timer);speak('Пауза')}else{running=true;deadline=Date.now()+remaining*1000;$('pauseBtn').textContent='Ⅱ';timer=setInterval(tick,100);speak('Продолжаем')}}
function next(){totalElapsed+=Math.max(0,routine[idx].d-remaining);if(idx<routine.length-1){idx++;loadStep(true)}else finish()}
function prev(){if(idx>0){idx--;loadStep(false)}}
function finish(){clearInterval(timer);running=false;unlockWake();const d=done();d[`${selectedWeek+1}-${selectedDay}`]=true;saveDone(d);$('controlPanel').innerHTML=`<div class="finish"><div class="mark">✓</div><h2>15 минут готово</h2><p>Неделя ${selectedWeek+1} • ${DAY_NAMES[selectedDay]}</p><button id="finishBtn">ГОТОВО</button></div>`;$('finishBtn').onclick=closePlayer;speak('Тренировка завершена')}
function closePlayer(){clearInterval(timer);running=false;unlockWake();$('player').classList.remove('show');document.body.style.overflow='';location.reload()}
$('startBtn').onclick=start;$('pauseBtn').onclick=toggle;$('nextBtn').onclick=next;$('prevBtn').onclick=prev;$('closeBtn').onclick=closePlayer;$('soundBtn').onclick=()=>{sound=!sound;$('soundBtn').textContent=sound?'🔊':'🔇'};
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'&&running){remaining=Math.max(0,(deadline-Date.now())/1000);renderClock()}});
if('serviceWorker'in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));preload();renderHome();
})();