// Theme toggle with ARIA
(function(){
  var root=document.documentElement,toggle=document.getElementById('themeToggle'),icon=document.getElementById('themeIcon');
  function u(){
    var dark=root.dataset.theme==='dark';
    icon.textContent=dark?'\u2600':'\u263E';
    toggle.setAttribute('aria-checked',dark?'true':'false');
  }
  try{var s=localStorage.getItem('airmcp-theme');if(s)root.dataset.theme=s;}catch(e){}
  u();
  toggle.addEventListener('click',function(){
    root.dataset.theme=root.dataset.theme==='dark'?'light':'dark';
    try{localStorage.setItem('airmcp-theme',root.dataset.theme);}catch(e){}
    u();
  });
})();

// Scroll reveal with prefers-reduced-motion check
(function(){
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    document.querySelectorAll('.reveal').forEach(function(el){el.classList.add('visible');});
    return;
  }
  var obs=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        var d=parseInt(e.target.dataset.delay||0);
        setTimeout(function(){e.target.classList.add('visible');},d);
        obs.unobserve(e.target);
      }
    });
  },{threshold:0.1,rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.reveal').forEach(function(el){obs.observe(el);});
})();

// Tab filtering
(function(){
  var tabs=document.querySelectorAll('.tab-btn');
  var cards=document.querySelectorAll('.catalog-card');
  tabs.forEach(function(tab){
    tab.addEventListener('click',function(){
      tabs.forEach(function(t){t.classList.remove('active');t.setAttribute('aria-selected','false');});
      tab.classList.add('active');
      tab.setAttribute('aria-selected','true');
      var filter=tab.dataset.filter;
      cards.forEach(function(card){
        var link=card.closest('.catalog-link');
        if(filter==='all'||card.dataset.category===filter){
          if(link)link.style.display='';
        }else{
          if(link)link.style.display='none';
        }
      });
    });
  });
})();

// Accordion
(function(){
  var toggle=document.getElementById('starterToggle');
  var content=document.getElementById('starterContent');
  var arrow=toggle.querySelector('.accordion-arrow');
  toggle.addEventListener('click',function(){
    var open=content.classList.toggle('open');
    toggle.setAttribute('aria-expanded',open?'true':'false');
    arrow.style.transform=open?'rotate(180deg)':'';
  });
})();
