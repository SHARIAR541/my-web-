(function(){
 var $=function(s){return document.querySelector(s)};
 var root=document.documentElement;
 try{var t=localStorage.getItem('theme');if(t)root.setAttribute('data-theme',t)}catch(e){}
 $('#theme').addEventListener('click',function(){
  var dark=root.getAttribute('data-theme')?root.getAttribute('data-theme')==='dark':matchMedia('(prefers-color-scheme: dark)').matches;
  var next=dark?'light':'dark';root.setAttribute('data-theme',next);
  try{localStorage.setItem('theme',next)}catch(e){}
 });
 var menu=$('#menu'),links=$('#links');
 menu.addEventListener('click',function(){var o=links.classList.toggle('open');menu.setAttribute('aria-expanded',o)});
 links.addEventListener('click',function(e){if(e.target.tagName==='A'){links.classList.remove('open');menu.setAttribute('aria-expanded',false)}});
 $('#yr').textContent=new Date().getFullYear();
 var rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
 var h=$('h1'),n=0;h.setAttribute('aria-label','Robert Thompson');
 h.innerHTML=h.innerHTML.split('<br>').map(function(w){return '<span class="w" aria-hidden="true">'+w.split('').map(function(c){return '<i style="--d:'+(n++)+'">'+c+'</i>'}).join('')+'</span>'}).join('<br>');
 document.querySelectorAll('.stat,.big').forEach(function(el,i){el.classList.add('rv');el.style.transitionDelay=(i*110)+'ms'});
 var bar=document.createElement('div');bar.className='bar';document.body.appendChild(bar);
 var port=$('.portrait img');
 function onS(){var m=document.documentElement.scrollHeight-innerHeight;bar.style.transform='scaleX('+(m>0?scrollY/m:0)+')';if(!rm&&scrollY<1400)port.style.transform='translateY('+(scrollY*.1)+'px) scale(1.1)'}
 addEventListener('scroll',onS,{passive:true});onS();
 if(!rm&&matchMedia('(pointer:fine)').matches){
  var g=document.createElement('div');g.className='glow';document.body.appendChild(g);var tx=0,ty=0,gx=0,gy=0;
  addEventListener('mousemove',function(e){tx=e.clientX;ty=e.clientY});
  (function loop(){gx+=(tx-gx)*.1;gy+=(ty-gy)*.1;g.style.transform='translate('+(gx-200)+'px,'+(gy-200)+'px)';requestAnimationFrame(loop)})();
  document.querySelectorAll('.row,.stat').forEach(function(el){
   el.addEventListener('mousemove',function(e){var r=el.getBoundingClientRect(),px=(e.clientX-r.left)/r.width-.5,py=(e.clientY-r.top)/r.height-.5;el.style.transition='transform .15s ease-out';el.style.transform='perspective(800px) rotateX('+(-py*6)+'deg) rotateY('+(px*8)+'deg) translateY(-4px)'});
   el.addEventListener('mouseleave',function(){el.style.transition='transform .7s cubic-bezier(.2,.8,.2,1)';el.style.transform=''});
  });
  document.querySelectorAll('.btn,.hire').forEach(function(el){
   el.addEventListener('mousemove',function(e){var r=el.getBoundingClientRect();el.style.transform='translate('+((e.clientX-r.left-r.width/2)*.25)+'px,'+((e.clientY-r.top-r.height/2)*.35)+'px)'});
   el.addEventListener('mouseleave',function(){el.style.transform=''});
  });
 }
 var io=new IntersectionObserver(function(es){es.forEach(function(en){
  if(!en.isIntersecting)return;var el=en.target;io.unobserve(el);
  if(el.classList.contains('rv'))el.classList.add('in');
  if(el.dataset.count){var end=+el.dataset.count,s=null;
   (function step(ts){s=s||ts;var p=Math.min((ts-s)/1200,1);el.textContent=Math.round(end*p)+(end>=40&&p===1?'+':'');if(p<1)requestAnimationFrame(step)})(performance.now());}
 })},{threshold:.2});
 document.querySelectorAll('.rv,[data-count]').forEach(function(el){io.observe(el)});
 $('#form').addEventListener('submit',function(ev){
  ev.preventDefault();var n=$('#n').value.trim(),e=$('#e').value.trim(),m=$('#m').value.trim(),out=$('#msg');
  if(!n||!/^\S+@\S+\.\S+$/.test(e)||!m){out.textContent='Please enter your name, a valid email and a message.';return}
  var body=m+'\n\nFrom: '+n+' ('+e+')';
  location.href='mailto:robert.thompson@example.com?subject='+encodeURIComponent('Message from '+n)+'&body='+encodeURIComponent(body);
  out.textContent='Opening your email app to send the message.';
 });
})();
