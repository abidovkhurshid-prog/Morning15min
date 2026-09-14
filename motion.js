(()=>{'use strict';
const NS='http://www.w3.org/2000/svg';
const clamp=v=>Math.max(0,Math.min(1,v));
const wave=p=>(1-Math.cos(Math.PI*2*p))/2;
const alt=p=>(Math.sin(Math.PI*2*p)+1)/2;
const P=(x,y)=>({x,y});
const mix=(a,b,t)=>P(a.x+(b.x-a.x)*t,a.y+(b.y-a.y)*t);
const pose=(o={})=>Object.assign({
  head:P(50,17), neck:P(50,27), ls:P(42,31), rs:P(58,31),
  le:P(39,47), re:P(61,47), lh:P(38,61), rh:P(62,61),
  hip:P(50,55), lk:P(44,72), rk:P(56,72), la:P(42,91), ra:P(58,91)
},o);

function stand(p){
  return pose({head:P(50,17),neck:P(50,27),ls:P(42,31),rs:P(58,31),le:P(39,47),re:P(61,47),lh:P(38,62),rh:P(62,62),hip:P(50,54),lk:P(45,72),rk:P(55,72),la:P(43,91),ra:P(57,91)});
}
function squat(p){
  const q=wave(p), y=18*q;
  return pose({
    head:P(50,17+y*.78),neck:P(50,27+y*.78),ls:P(42,31+y*.75),rs:P(58,31+y*.75),
    le:P(36,45+y*.3),re:P(64,45+y*.3),lh:P(34,53+y*.12),rh:P(66,53+y*.12),
    hip:P(50,54+y),lk:P(37,69+y*.72),rk:P(63,69+y*.72),la:P(42,91),ra:P(58,91)
  });
}
function wallPush(p){
  const q=wave(p), sx=55+12*q, sy=34+5*q;
  return pose({
    head:P(sx-5,23+4*q),neck:P(sx-2,30+4*q),ls:P(sx-4,34+4*q),rs:P(sx+4,34+4*q),
    le:P(69+3*q,45),re:P(70+3*q,49),lh:P(82,43),rh:P(82,51),
    hip:P(42+8*q,57+2*q),lk:P(34+4*q,73),rk:P(39+4*q,75),la:P(27,91),ra:P(33,91)
  });
}
function pushup(p){
  const q=wave(p), dy=14*q;
  return pose({
    head:P(72,48+dy),neck:P(66,53+dy),ls:P(62,55+dy),rs:P(64,58+dy),
    le:P(70,71+dy*.42),re:P(76,72+dy*.35),lh:P(75,88),rh:P(81,88),
    hip:P(45,63+dy*.55),lk:P(32,73+dy*.25),rk:P(34,76+dy*.2),la:P(18,88),ra:P(20,88)
  });
}
function deadbug(p){
  const a=alt(p), b=1-a;
  const lhand=mix(P(42,35),P(16,48),a), rhand=mix(P(42,35),P(16,48),b);
  const lank=mix(P(70,50),P(90,74),b), rank=mix(P(70,50),P(90,74),a);
  return pose({
    head:P(18,74),neck:P(27,73),ls:P(31,70),rs:P(33,75),
    le:P(37,54),re:P(39,58),lh:lhand,rh:rhand,hip:P(52,75),
    lk:P(64,57),rk:P(66,62),la:lank,ra:rank
  });
}
function reverseLunge(p){
  const q=wave(p), backX=49-24*q, hipY=54+16*q;
  return pose({
    head:P(50,17+12*q),neck:P(50,27+12*q),ls:P(42,31+12*q),rs:P(58,31+12*q),
    le:P(40,46+11*q),re:P(60,46+11*q),lh:P(40,60+9*q),rh:P(60,60+9*q),
    hip:P(50,hipY),lk:P(61,68+10*q),rk:P(37-8*q,69+10*q),la:P(61,91),ra:P(backX,91)
  });
}
function calf(p){
  const q=wave(p), up=6*q;
  return pose({
    head:P(50,17-up),neck:P(50,27-up),ls:P(42,31-up),rs:P(58,31-up),le:P(39,47-up),re:P(61,47-up),
    lh:P(38,61-up),rh:P(62,61-up),hip:P(50,54-up),lk:P(45,72-up),rk:P(55,72-up),la:P(45,91-up*.22),ra:P(55,91-up*.22)
  });
}
function bicycle(p){
  const a=alt(p), b=1-a;
  const lk=mix(P(59,58),P(72,66),a), la=mix(P(70,43),P(88,74),a);
  const rk=mix(P(60,60),P(73,67),b), ra=mix(P(71,45),P(89,76),b);
  const shoulder=P(33,63);
  return pose({
    head:P(22,54),neck:P(28,61),ls:shoulder,rs:P(35,67),
    le:P(21,43),re:P(24,47),lh:P(15,53),rh:P(18,57),hip:P(51,75),lk,rk,la,ra
  });
}
function situp(p){
  const q=wave(p);
  return pose({
    head:P(24+22*q,74-35*q),neck:P(31+18*q,75-30*q),ls:P(34+16*q,72-26*q),rs:P(37+16*q,76-26*q),
    le:P(25+28*q,58-18*q),re:P(28+28*q,61-18*q),lh:P(17+35*q,42-8*q),rh:P(20+35*q,46-8*q),
    hip:P(53,77),lk:P(69,67),rk:P(72,70),la:P(82,88),ra:P(86,88)
  });
}
function ankle(p){
  const a=p*Math.PI*2, fx=64+7*Math.cos(a), fy=73+7*Math.sin(a);
  return pose({
    head:P(39,16),neck:P(39,27),ls:P(31,31),rs:P(47,31),le:P(30,47),re:P(49,47),lh:P(31,60),rh:P(51,60),
    hip:P(40,54),lk:P(38,72),rk:P(54,68),la:P(37,91),ra:P(fx,fy)
  });
}
function seatedBase(){
  return pose({
    head:P(48,20),neck:P(48,30),ls:P(40,34),rs:P(56,34),le:P(40,49),re:P(57,49),lh:P(43,61),rh:P(60,61),
    hip:P(49,58),lk:P(40,72),rk:P(58,72),la:P(39,91),ra:P(59,91)
  });
}
function seatedMarch(p){
  const a=alt(p), b=1-a, s=seatedBase();
  s.lk=P(40,72-13*a);s.la=P(39,91-15*a);s.rk=P(58,72-13*b);s.ra=P(59,91-15*b);return s;
}
function seatedKnee(p){
  const a=alt(p), b=1-a, s=seatedBase();
  s.la=mix(P(39,91),P(25,72),a);s.ra=mix(P(59,91),P(75,72),b);return s;
}
function seatedTwist(p){
  const s=seatedBase(), a=Math.sin(p*Math.PI*2), shift=7*a;
  s.ls=P(40+shift,34);s.rs=P(56+shift,34);s.le=P(39+shift,48);s.re=P(57+shift,48);s.lh=P(48+shift,50);s.rh=P(48+shift,55);s.head=P(48+shift*.5,20);s.neck=P(48+shift*.6,30);return s;
}
function seatedCalf(p){
  const q=wave(p), s=seatedBase();
  s.la=P(39,91-7*q);s.ra=P(59,91-7*q);return s;
}
function sitStand(p){
  const q=wave(p);
  const seated=seatedBase(), standing=stand(p), out={};
  Object.keys(seated).forEach(k=>out[k]=mix(seated[k],standing[k],q));
  return out;
}
function gluteStretch(p){
  const q=wave(p), s=seatedBase();
  s.rk=P(58,72);s.ra=P(44,70);s.head=P(48+7*q,20+10*q);s.neck=P(48+8*q,30+9*q);s.ls=P(40+8*q,34+8*q);s.rs=P(56+8*q,34+8*q);s.le=P(43+7*q,49+6*q);s.re=P(57+5*q,49+6*q);s.lh=P(48,63);s.rh=P(54,64);return s;
}
function breath(p){
  const q=wave(p), s=stand(p);s.ls=P(42-2*q,31);s.rs=P(58+2*q,31);s.le=P(39-3*q,47);s.re=P(61+3*q,47);s.lh=P(38-4*q,61);s.rh=P(62+4*q,61);return s;
}

const DEF={
  squat:{name:'Приседания',cycle:5200,pose:squat,view:'front'},
  wall:{name:'Отжимания от стены',cycle:5000,pose:wallPush,view:'side',wall:true},
  push:{name:'Отжимания',cycle:5200,pose:pushup,view:'side',floor:true},
  dead:{name:'Dead bug',cycle:5600,pose:deadbug,view:'side',floor:true},
  lunge:{name:'Обратные выпады',cycle:5600,pose:reverseLunge,view:'front'},
  calf:{name:'Подъём на носки',cycle:4600,pose:calf,view:'front'},
  bike:{name:'Велосипед',cycle:3600,pose:bicycle,view:'side',floor:true},
  situp:{name:'Подъём корпуса',cycle:5600,pose:situp,view:'side',floor:true},
  ankle:{name:'Круги стопой',cycle:6000,pose:ankle,view:'front'},
  seatedMarch:{name:'Марш сидя',cycle:3600,pose:seatedMarch,chair:true},
  seatedKnee:{name:'Разгибание колена сидя',cycle:4400,pose:seatedKnee,chair:true},
  seatedTwist:{name:'Повороты корпуса сидя',cycle:5200,pose:seatedTwist,chair:true},
  seatedCalf:{name:'Подъём пяток сидя',cycle:4200,pose:seatedCalf,chair:true},
  sitStand:{name:'Вставание со стула',cycle:5600,pose:sitStand,chair:true},
  gluteStretch:{name:'Растяжка ягодичных сидя',cycle:7200,pose:gluteStretch,chair:true},
  breath:{name:'Спокойное дыхание',cycle:10000,pose:breath,breath:true}
};

function svgEl(name,attrs={}){const e=document.createElementNS(NS,name);Object.entries(attrs).forEach(([k,v])=>e.setAttribute(k,v));return e}
function addLine(svg,a,b,cls){const l=svgEl('line',{x1:a.x,y1:a.y,x2:b.x,y2:b.y,class:cls});svg.appendChild(l);return l}
function stageMarkup(def){
  const svg=svgEl('svg',{viewBox:'0 0 100 100',role:'img','aria-label':def.name,preserveAspectRatio:'xMidYMid meet'});
  svg.classList.add('motionSvg');
  const bg=svgEl('rect',{x:0,y:0,width:100,height:100,rx:0,class:'motionBg'});svg.appendChild(bg);
  const guide=svgEl('line',{x1:10,y1:92,x2:90,y2:92,class:'motionFloor'});svg.appendChild(guide);
  const wall=svgEl('line',{x1:84,y1:15,x2:84,y2:92,class:'motionWall'});svg.appendChild(wall);wall.style.display=def.wall?'block':'none';
  const chair=svgEl('g',{class:'motionChair'});
  chair.appendChild(svgEl('path',{d:'M32 58 H66 V64 H35 V92 M64 64 V92 M32 58 V35',class:'chairPath'}));svg.appendChild(chair);chair.style.display=def.chair?'block':'none';
  const halo=svgEl('circle',{cx:50,cy:42,r:18,class:'breathHalo'});svg.appendChild(halo);halo.style.display=def.breath?'block':'none';
  const body=svgEl('g',{class:'motionBody'});svg.appendChild(body);
  const parts={
    torso:addLine(body,P(50,27),P(50,55),'limb torso'),
    uaL:addLine(body,P(42,31),P(39,47),'limb back'),faL:addLine(body,P(39,47),P(38,61),'limb back'),
    uaR:addLine(body,P(58,31),P(61,47),'limb front'),faR:addLine(body,P(61,47),P(62,61),'limb front'),
    thL:addLine(body,P(50,55),P(44,72),'limb back'),shL:addLine(body,P(44,72),P(42,91),'limb back'),
    thR:addLine(body,P(50,55),P(56,72),'limb front'),shR:addLine(body,P(56,72),P(58,91),'limb front'),
    shoulder:addLine(body,P(42,31),P(58,31),'limb shoulder'),
    head:svgEl('circle',{cx:50,cy:17,r:6.2,class:'head'}),
    hip:svgEl('circle',{cx:50,cy:55,r:2.5,class:'joint'}),
    lK:svgEl('circle',{cx:44,cy:72,r:2.2,class:'joint'}),rK:svgEl('circle',{cx:56,cy:72,r:2.2,class:'joint'}),
    lE:svgEl('circle',{cx:39,cy:47,r:1.9,class:'joint'}),rE:svgEl('circle',{cx:61,cy:47,r:1.9,class:'joint'})
  };
  body.append(parts.head,parts.hip,parts.lK,parts.rK,parts.lE,parts.rE);
  const phase=svgEl('text',{x:50,y:8,'text-anchor':'middle',class:'motionCaption'});phase.textContent='ПЛАВНО • КОНТРОЛЬ';svg.appendChild(phase);
  return {svg,parts,halo};
}
function setLine(el,a,b){el.setAttribute('x1',a.x);el.setAttribute('y1',a.y);el.setAttribute('x2',b.x);el.setAttribute('y2',b.y)}
function apply(parts,s,halo,p){
  setLine(parts.torso,s.neck,s.hip);setLine(parts.shoulder,s.ls,s.rs);
  setLine(parts.uaL,s.ls,s.le);setLine(parts.faL,s.le,s.lh);setLine(parts.uaR,s.rs,s.re);setLine(parts.faR,s.re,s.rh);
  setLine(parts.thL,s.hip,s.lk);setLine(parts.shL,s.lk,s.la);setLine(parts.thR,s.hip,s.rk);setLine(parts.shR,s.rk,s.ra);
  parts.head.setAttribute('cx',s.head.x);parts.head.setAttribute('cy',s.head.y);
  [['hip',s.hip],['lK',s.lk],['rK',s.rk],['lE',s.le],['rE',s.re]].forEach(([k,v])=>{parts[k].setAttribute('cx',v.x);parts[k].setAttribute('cy',v.y)});
  if(halo&&halo.style.display!=='none'){const q=wave(p);halo.setAttribute('r',15+8*q);halo.setAttribute('opacity',.08+.12*q)}
}
function mount(el,key,opts={}){
  let def=DEF[key]||DEF.squat,pack=stageMarkup(def),raf=0,paused=!!opts.paused,start=performance.now(),pauseAt=0,offset=0;
  el.innerHTML='';el.appendChild(pack.svg);
  function loop(now){
    if(!paused){
      const t=(now-start-offset)%def.cycle, p=clamp(t/def.cycle);
      apply(pack.parts,def.pose(p),pack.halo,p);
    }
    raf=requestAnimationFrame(loop);
  }
  raf=requestAnimationFrame(loop);
  return {
    pause(){if(!paused){paused=true;pauseAt=performance.now()}},
    resume(){if(paused){offset+=performance.now()-pauseAt;paused=false}},
    destroy(){cancelAnimationFrame(raf)},
    setKey(k){cancelAnimationFrame(raf);const np=mount(el,k,{paused});Object.assign(this,np)}
  };
}
function staticSvg(key){
  const def=DEF[key]||DEF.squat,pack=stageMarkup(def),s=def.pose(.18);apply(pack.parts,s,pack.halo,.18);
  pack.svg.classList.add('motionThumbSvg');return pack.svg.outerHTML;
}
window.M15Motion={mount,staticSvg,defs:DEF};
})();