(()=>{
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
const clamp=(v,a=0,b=1)=>Math.min(b,Math.max(a,v)),sm=t=>t*t*(3-2*t);
/* carregamento */
const hi=$('#heroImg');let started=false;
const go=()=>{if(started)return;started=true;requestAnimationFrame(()=>setTimeout(()=>document.body.classList.remove('is-loading'),150))};
hi.complete?go():hi.addEventListener('load',go);setTimeout(go,2500);
/* menu */
const hdr=$('#hdr'),b=$('#burger');
b.onclick=()=>{const o=hdr.classList.toggle('open');b.setAttribute('aria-expanded',o)};
$$('#nav a').forEach(a=>a.onclick=()=>{hdr.classList.remove('open');b.setAttribute('aria-expanded',false)});
/* reveal clássico (seções fora do filme) */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});
$$('[data-reveal]').forEach(el=>io.observe(el));
$$('.why h2,.brand h2,.final-txt h2').forEach(h=>{const t=h.textContent.trim();h.setAttribute('aria-label',t);h.innerHTML=t.split(/\s+/).map((w,i)=>`<span class="w" aria-hidden="true" style="--i:${i}"><span>${w}</span></span>`).join(' ')});
const jars=$$('.jar').map(j=>{const im=j.querySelector('img'),s=document.createElement('i');s.className='sheen';s.setAttribute('aria-hidden','true');
 const set=()=>s.style.setProperty('--m',`url("${im.currentSrc||im.src}")`);im.complete?set():im.addEventListener('load',set);j.appendChild(s);return{j,s}});
/* ===== FILME ===== */
const film=$('.film'),jb=$('#jarBody'),jl=$('#jarLid'),cream=$('#cream'),plate=$('#plate'),pimg=plate.querySelector('img'),bloom=$('#bloom'),bgb=$('#bgb'),floor=$('#floor'),petals=$$('.stage .petal');
const T=[[$('#sHero'),[-1,0,.06,.16]],[$('#sRit'),[.2,.3,.4,.48]],[$('#sTex'),[.64,.72,.79,.85]],[$('#sSens'),[.93,.99,1.5,2]]];
/* corpo e tampa: [p, x(vw), y(vh), escala, rotação] — coincidem até .46, depois a tampa se solta */
const BODY=[[0,24,0,.92,0],[.14,24,0,1,0],[.3,14,0,1.15,0],[.46,12,0,1.5,0],[.6,0,3,2,1],[.72,0,5,2.8,0],[.8,0,3,2.2,0],[.92,20,0,1,0],[1,20,0,1,0]];
const LID=[[0,24,0,.92,0],[.14,24,0,1,0],[.3,14,0,1.15,0],[.46,12,0,1.5,0],[.56,13,-24,1.5,-5],[.68,16,-18,2,-12],[.8,38,-8,2.6,-22],[.9,23,-18,1.15,-4],[.97,20,0,1,0],[1,20,0,1,0]];
const BL=[[0,0,.95],[.16,1,.95],[.32,1.25,.9],[.46,.4,0],[1,.4,0]];
const kf=(K,p)=>{if(p<=K[0][0])return K[0].slice(1);for(let i=1;i<K.length;i++)if(p<=K[i][0]){const a=K[i-1],c=K[i],u=(p-a[0])/(c[0]-a[0]),t=u*.4+sm(u)*.6;return a.slice(1).map((v,j)=>v+(c[j+1]-v)*t)}return K[K.length-1].slice(1)};
[[0,16,30,8,-70],[0,16,30,8,-30],[0,16,30,8,10],[0,16,30,8,50],[0,16,30,8,90],[0,16,30,8,130],[0,16,30,8,170],[0,16,30,8,-110],[1,11,21,4,-90],[1,11,21,4,-45],[1,11,21,4,0],[1,11,21,4,45],[1,11,21,4,90],[1,11,21,4,135],[1,11,21,4,180],[1,11,21,4,-135]].forEach(([i,w,h,d,a])=>{const e=document.createElement('i');e.className='bp';e.style.cssText=`--w:${w*(i?1:1)}vmin;--h:${h}vmin;--d:${d}vmin;--a:${a}`;if(i)e.style.opacity=.8;bloom.appendChild(e)});
let M=innerWidth<=900;addEventListener('resize',()=>{M=innerWidth<=900;kick()});
const place=(el,[x,y,s,r],p)=>{if(M){x*=.25;y+=-4-6*sm(clamp((p-.18)/.12));s=1+(s-1)*.6}
 el.style.transform=`translate(-50%,-50%) translate3d(${x}vw,${y}vh,0) scale(${s}) rotate(${r}deg)`;return[x,y,s]};
function render(p){
 const[bx,by,bs]=place(jb,kf(BODY,p),p);place(jl,kf(LID,p),p);
 const lift=sm(clamp((p-.46)/.1))*(1-sm(clamp((p-.9)/.07)));cream.style.opacity=lift;jb.style.setProperty('--sh',1-clamp((p-.44)/.1));
 const[o,bo]=kf(BL,p);bloom.style.setProperty('--o',o.toFixed(3));bloom.style.opacity=bo;bloom.style.transform=`translate(${bx}vw,${by}vh) scale(${1+(bs-1)*.5})`;
 const r=sm(clamp((p-.56)/.24)),po=1-sm(clamp((p-.8)/.1));
 plate.style.clipPath=`circle(${r*150}% at 50% 55%)`;plate.style.opacity=po;pimg.style.transform=`scale(${1.3-r*.3+(1-po)*.12})`;
 bgb.style.opacity=clamp((p-.28)/.2);floor.style.opacity=1-clamp((p-.3)/.15);
 T.forEach(([el,[a,c,d,e]])=>{const i=sm(clamp((p-a)/(c-a))),u=sm(clamp((p-d)/(e-d))),v=i*(1-u);
  el.style.opacity=v;el.style.visibility=v<.01?'hidden':'visible';el.style.transform=`translate3d(0,${(1-i)*36-u*28}px,0)`;el.style.filter=v<.98?`blur(${((1-v)*5).toFixed(1)}px)`:'none'});
 const po2=sm(clamp((p-.84)/.1));petals.forEach(e=>{e.style.opacity=po2*.85;e.style.transform=`translate3d(0,${(p-.9)*600*e.dataset.k}px,0)`});
}
let cur=0,raf=0;
const target=()=>{const r=film.getBoundingClientRect();return clamp(-r.top/(r.height-innerHeight))};
function loop(){const t=target();cur+=(t-cur)*(rm?1:.085);if(Math.abs(t-cur)<.0002)cur=t;render(cur);raf=cur!==t?requestAnimationFrame(loop):0}
function kick(){if(!raf)raf=requestAnimationFrame(loop)}
/* progresso, header e brilho */
const prog=$('#prog');let q=false;
function upd(){q=false;const y=scrollY,vh=innerHeight;hdr.classList.toggle('on',y>40);
 prog.style.transform=`scaleX(${clamp(y/Math.max(1,document.documentElement.scrollHeight-vh))})`;
 if(rm)return;jars.forEach(({j,s})=>{const r=j.getBoundingClientRect();if(r.bottom<0||r.top>vh)return;s.style.setProperty('--sx',(18+(1-clamp((r.top+r.height/2)/vh))*64).toFixed(1))})}
addEventListener('scroll',()=>{kick();if(!q){q=true;requestAnimationFrame(upd)}},{passive:true});
addEventListener('resize',upd);upd();cur=target();render(cur);
})();
