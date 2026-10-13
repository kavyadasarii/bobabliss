(()=>{
  const tabs=[...document.querySelectorAll('.mn-tab')],secs=[...document.querySelectorAll('.mn-sec')],q=document.getElementById('mn-q'),count=document.getElementById('mn-count'),empty=document.getElementById('mn-empty');
  let f='all';
  const apply=()=>{
    const term=q.value.trim().toLowerCase();let n=0;
    secs.forEach(s=>{
      const show=f==='all'||s.dataset.sec===f;let v=0;
      s.querySelectorAll('.mn-item').forEach(i=>{const m=!term||i.textContent.toLowerCase().includes(term);i.hidden=!m;if(m)v++;});
      s.querySelectorAll('.mn-top > div').forEach(g=>{g.hidden=!g.querySelector('.mn-item:not([hidden])');});
      s.hidden=!show||v===0;if(!s.hidden)n+=v;
    });
    tabs.forEach(t=>t.setAttribute('aria-pressed',t.dataset.f===f));
    count.textContent=`Showing ${n} item${n===1?'':'s'}`;empty.style.display=n?'none':'block';
  };
  tabs.forEach(t=>t.addEventListener('click',()=>{f=t.dataset.f;history.replaceState(null,'',f==='all'?location.pathname:'#'+f);apply();}));
  q.addEventListener('input',apply);
  const fromHash=()=>{const h=location.hash.slice(1);f=tabs.some(t=>t.dataset.f===h)?h:'all';apply();};
  window.addEventListener('hashchange',fromHash);fromHash();
})();