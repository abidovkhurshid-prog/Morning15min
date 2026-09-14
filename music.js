(()=>{'use strict';
const VIDEO_ID='gdFkTGQM_Ag';
const startBtn=document.getElementById('startBtn');
const pauseBtn=document.getElementById('pauseBtn');
const closeBtn=document.getElementById('closeBtn');
const controlPanel=document.getElementById('controlPanel');
if(!startBtn||!pauseBtn||!closeBtn||!controlPanel)return;

const style=document.createElement('style');
style.textContent=`
.musicDock{margin-top:14px;background:#171717;border:1px solid #2a2a2a;border-radius:16px;padding:10px;overflow:hidden}
.musicHead{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:8px}
.musicHead>div{min-width:0}.musicHead small{display:block;color:#b8f36a;font-size:9px;font-weight:900;letter-spacing:.12em}.musicHead b{display:block;margin-top:3px;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.musicToggle{background:#efe3d2;color:#17120f;border-radius:999px;padding:8px 11px;font-size:11px;font-weight:900;min-width:72px}
.musicToggle.off{background:#252525;color:#aaa}.musicFrame{height:92px;border-radius:12px;overflow:hidden;background:#0b0b0b}.musicFrame iframe{display:block;width:100%;height:100%;border:0}
.musicHint{font-size:10px;color:#8f8f8f;margin-top:7px;line-height:1.35}
@media(max-height:760px){.musicFrame{height:76px}}
`;
document.head.appendChild(style);

const dock=document.createElement('div');
dock.className='musicDock';
dock.id='musicDock';
dock.innerHTML=`<div class="musicHead"><div><small>♪ МУЗЫКА ТРЕНИРОВКИ</small><b>Ваш трек с YouTube</b></div><button class="musicToggle" id="musicToggle">♫ ВКЛ</button></div><div class="musicFrame"><iframe id="musicFrame" title="Музыка тренировки" allow="autoplay; encrypted-media; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div><div class="musicHint">Музыка запускается вместе с тренировкой. Если iPhone блокирует автозапуск, нажми ▶ один раз прямо в плеере.</div>`;
controlPanel.appendChild(dock);

const frame=document.getElementById('musicFrame');
const toggle=document.getElementById('musicToggle');
let loaded=false;
let musicOn=localStorage.getItem('m15-music')!=='off';

function syncToggle(){toggle.textContent=musicOn?'♫ ВКЛ':'♫ ВЫКЛ';toggle.classList.toggle('off',!musicOn)}
function command(func){if(!loaded||!frame.contentWindow)return;try{frame.contentWindow.postMessage(JSON.stringify({event:'command',func,args:[]}),'https://www.youtube.com')}catch(e){}}
function loadAndPlay(){if(!musicOn)return;if(!loaded){loaded=true;frame.src=`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&playsinline=1&loop=1&playlist=${VIDEO_ID}&controls=1&enablejsapi=1&rel=0`;return}command('playVideo')}
function pauseMusic(){command('pauseVideo')}

syncToggle();
toggle.addEventListener('click',()=>{musicOn=!musicOn;localStorage.setItem('m15-music',musicOn?'on':'off');syncToggle();if(musicOn)loadAndPlay();else pauseMusic()});
startBtn.addEventListener('click',()=>{if(musicOn)loadAndPlay()});
pauseBtn.addEventListener('click',()=>{queueMicrotask(()=>{if(pauseBtn.textContent.includes('▶'))pauseMusic();else if(musicOn)loadAndPlay()})});
closeBtn.addEventListener('click',pauseMusic);
new MutationObserver(()=>{if(controlPanel.querySelector('.finish'))pauseMusic()}).observe(controlPanel,{childList:true,subtree:true});
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')pauseMusic()});
})();