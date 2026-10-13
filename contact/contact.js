
(()=>{
  const S=[{"n": "Banjara Hills", "a": "Road No. 12, Banjara Hills, Hyderabad 500034", "la": 17.4126, "lo": 78.4482}, {"n": "Jubilee Hills", "a": "Road No. 36, Jubilee Hills, Hyderabad 500033", "la": 17.4325, "lo": 78.4071}, {"n": "HITEC City", "a": "Madhapur, near HITEC City, Hyderabad 500081", "la": 17.4435, "lo": 78.3772}];
  const btns=[...document.querySelectorAll('.ct-store')],frame=document.getElementById('ct-frame');
  const show=(i)=>{
    const s=S[i],dx=.011,dy=.0065;
    frame.src=`https://www.openstreetmap.org/export/embed.html?bbox=${s.lo-dx}%2C${s.la-dy}%2C${s.lo+dx}%2C${s.la+dy}&layer=mapnik&marker=${s.la}%2C${s.lo}`;
    document.getElementById('ct-mname').textContent='BobaBliss '+s.n;
    document.getElementById('ct-maddr').textContent=s.a;
    document.getElementById('ct-dir').href=`https://www.google.com/maps/search/?api=1&query=${s.la},${s.lo}`;
    btns.forEach((b,k)=>b.setAttribute('aria-pressed',k===i));
    const sel=document.getElementById('f-store');if(sel)sel.selectedIndex=i;
  };
  const box=document.getElementById('ct-mapbox'),lock=document.getElementById('ct-lock');
  const unlock=()=>box.classList.add('live'),relock=()=>box.classList.remove('live');
  lock.addEventListener('click',unlock);
  box.addEventListener('mouseleave',relock);
  document.addEventListener('click',e=>{if(!box.contains(e.target))relock();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')relock();});
  btns.forEach((b,i)=>b.addEventListener('click',()=>show(i)));
  show(0);
  const form=document.getElementById('ct-form'),thanks=document.getElementById('ct-thanks'),topic=document.getElementById('f-topic');
  const grp=()=>{const g=topic.value==='group';['f-date-wrap','f-cups-wrap'].forEach(id=>document.getElementById(id).hidden=!g);};
  topic.addEventListener('change',grp);grp();
  const sel=document.getElementById('f-store');sel.addEventListener('change',()=>show(sel.selectedIndex));
  form.addEventListener('submit',(e)=>{
    e.preventDefault();
    document.getElementById('ct-thanks-msg').textContent=`Thank you, ${document.getElementById('f-name').value.trim()}. We will reply to ${document.getElementById('f-email').value.trim()} within one working day.`;
    form.hidden=true;thanks.hidden=false;
  });
  document.getElementById('ct-again').addEventListener('click',()=>{form.reset();grp();form.hidden=false;thanks.hidden=true;});
})();