(function(){
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  var els=[].slice.call(document.querySelectorAll('.reveal'));
  function count(el){
    if(!el.hasAttribute('data-to'))return;
    var to=+el.getAttribute('data-to'),suf=el.getAttribute('data-suf')||'';
    if(reduce){el.textContent=to.toLocaleString('en-US')+suf;return}
    var t0=null,d=1400;
    function step(t){if(!t0)t0=t;var p=Math.min((t-t0)/d,1),e=1-Math.pow(1-p,3);
      el.textContent=Math.round(to*e).toLocaleString('en-US')+suf;if(p<1)requestAnimationFrame(step)}
    el.textContent='0'+suf;requestAnimationFrame(step);
  }
  if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in')});return}
  var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){
    en.target.classList.add('in');var n=en.target.querySelector('.num');if(n&&!n.dataset.done){n.dataset.done=1;count(n)}
    io.unobserve(en.target)}})},{rootMargin:'0px 0px -8% 0px',threshold:.08});
  els.forEach(function(e){io.observe(e)});
})();
(function(){
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  [].forEach.call(document.querySelectorAll('a[href="#top"]'),function(a){
    a.addEventListener('click',function(e){
      e.preventDefault();
      try{window.scrollTo({top:0,left:0,behavior:reduce?'auto':'smooth'})}catch(_){window.scrollTo(0,0)}
      if(history.replaceState)history.replaceState(null,'',location.pathname+location.search);
    });
  });
})();

(function(){
  var d=document.documentElement,b=document.getElementById('tt'),KEY='lt-theme';
  var meta=document.querySelector('meta[name="theme-color"]');
  var mq=window.matchMedia&&matchMedia('(prefers-color-scheme: dark)');
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  var timer;
  function sync(t){
    if(meta)meta.setAttribute('content',t==='dark'?'#08131d':'#d4ebf0');
    if(b){var l=t==='dark'?'Light mode':'Dark mode';b.setAttribute('aria-label',l);b.setAttribute('title',l)}
  }
  function apply(t,anim){
    if(anim&&!reduce){d.classList.add('tt-anim');clearTimeout(timer);timer=setTimeout(function(){d.classList.remove('tt-anim')},320)}
    d.dataset.theme=t;sync(t);
  }
  sync(d.dataset.theme==='dark'?'dark':'light');
  if(b)b.addEventListener('click',function(){
    var t=d.dataset.theme==='dark'?'light':'dark';
    try{localStorage.setItem(KEY,t)}catch(e){}
    apply(t,true);
  });
  function sys(e){var s=null;try{s=localStorage.getItem(KEY)}catch(_){}if(s!=='dark'&&s!=='light')apply(e.matches?'dark':'light',true)}
  if(mq){if(mq.addEventListener)mq.addEventListener('change',sys);else if(mq.addListener)mq.addListener(sys)}
})();
