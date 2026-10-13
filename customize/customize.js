/* Customize page — one script.
   1) Drink builder (steps, live cup preview, summary, presets, order)
   2) Hero card (tabs + sweetness preview) */


(() => {
  const rs = (n) => '₹' + n;
  const D = {
    size:[['m','Medium','500 ml',150],['l','Large','700 ml',180]],
    base:[['black','Black tea',0,['#EBD0A8','#B8803F']],['jasmine','Jasmine green',0,['#E4EDB8','#BFD580']],['oolong','Oolong',10,['#EDD2A0','#B07A38']],['matcha','Matcha',40,['#C4DE96','#86B551']],['hojicha','Hojicha',30,['#D6B28C','#8A5A33']],['none','No tea (ice blend)',0,['#F3EEE6','#E2D9C8']]],
    flavour:[['plain','Plain',0],['taro','Taro',30,['#CDB6F2','#9E7CDD']],['mango','Mango',30,['#FFD680','#FFAA2C']],['strawberry','Strawberry',30,['#FFB5C8','#FF7C9E']],['passion','Passionfruit',30,['#FFCB52','#F28C20']],['peach','Peach',20,['#FFCCAA','#FF9E6E']],['honeydew','Honeydew',30,['#D9F1B8','#A9DC7C']],['lychee','Lychee',20,['#FBE3EA','#F3B7C6']],['brownsugar','Brown sugar',20,['#E5BE92','#9C6534']],['rose','Rose',20,['#FFD3DE','#F79DB7']]],
    milk:[['fresh','Fresh milk',0],['oat','Oat milk',30],['soy','Soy milk',20],['almond','Almond milk',30],['coconut','Coconut milk',30],['none','No milk',0]],
    ice:[['regular','Regular ice'],['less','Less ice'],['none','No ice'],['warm','Served warm']],
    sweet:[0,25,50,75,100],
    tops:[['Pearls & boba',[['tapioca','Tapioca pearls',30,'p'],['mini','Mini pearls',30,'p'],['popping','Popping boba',40,'b'],['crystal','Crystal boba',40,'j']]],['Jellies',[['fruitj','Fruit jelly',30,'j'],['lychee','Lychee jelly',30,'j'],['grass','Grass jelly',30,'g'],['coconutj','Coconut jelly',30,'j'],['aloe','Aloe vera',35,'j']]],['Creamy',[['cheese','Cheese foam',50,'f'],['mfoam','Matcha foam',55,'m'],['egg','Egg pudding',45,'e']]],['Sweet extras',[['redbean','Red bean',35,'r'],['oreo','Oreo crumble',35,'o'],['syrup','Brown sugar syrup',25,'s']]]],
    max:3
  };
  const find = (list, id) => list.find((x) => x[0] === id);
  const allTops = D.tops.flatMap((g) => g[1]);
  const start = () => ({ size:'m', base:'black', flavour:'plain', milk:'fresh', sweet:50, ice:'regular', tops:[] });
  let S = start();

  const opt = (type, name, val, title, note, checked) =>
    `<label class="cu-opt"><input type="${type}" name="${name}" value="${val}"${checked ? ' checked' : ''}><span><b>${title}</b>${note ? `<small>${note}</small>` : ''}</span></label>`;
  const plus = (n) => (n ? '+' + rs(n) : 'Included');

  const steps = [
    ['size','Choose your size','Price shown is the starting price.', () => `<div class="cu-opts">${D.size.map((o) => opt('radio','size',o[0],o[1],`${o[2]} · ${rs(o[3])}`,S.size===o[0])).join('')}</div>`],
    ['base','Pick your tea base','The tea or blend your drink is built on.', () => `<div class="cu-opts">${D.base.map((o) => opt('radio','base',o[0],o[1],plus(o[2]),S.base===o[0])).join('')}</div>`],
    ['flavour','Add a flavour','Real fruit and syrups shaken into your cup.', () => `<div class="cu-opts">${D.flavour.map((o) => opt('radio','flavour',o[0],o[1],o[2] ? plus(o[2]) : 'No extra flavour',S.flavour===o[0])).join('')}</div>`],
    ['milk','Choose your milk','Dairy and plant options.', () => `<div class="cu-opts">${D.milk.map((o) => opt('radio','milk',o[0],o[1],plus(o[2]),S.milk===o[0])).join('')}</div>`],
    ['sweetness','Set sweetness and ice','Dial it to your taste.', () => `<p class="cu-sub">Sweetness</p><div class="cu-opts sm">${D.sweet.map((v) => opt('radio','sweet',v,v+'%','',S.sweet===v)).join('')}</div><p class="cu-sub">Ice</p><div class="cu-opts sm">${D.ice.map((o) => opt('radio','ice',o[0],o[1],'',S.ice===o[0])).join('')}</div>`],
    ['toppings','Add toppings',`Choose up to ${D.max}.`, () => D.tops.map((g) => `<p class="cu-sub">${g[0]}</p><div class="cu-opts">${g[1].map((o) => opt('checkbox','tops',o[0],o[1],'+'+rs(o[2]),S.tops.includes(o[0]))).join('')}</div>`).join('')]
  ];

  const root = document.getElementById('cu-steps');
  root.innerHTML = steps.map((s, i) => `<section class="cu-step" id="${s[0]}"><h2><span class="cu-n">${i+1}</span>${s[1]}</h2><p class="cu-hint">${s[2]}</p>${s[3]()}</section>`).join('');

  
  const xl = (y) => 70 + (y - 40) * 9 / 74;
  const poly = (a, b, c) => `<polygon points="${xl(a)},${a} ${200-xl(a)},${a} ${200-xl(b)},${b} ${xl(b)},${b}" fill="${c}"/>`;
  const topSvg = (kind, x, y) => ({
    p:`<circle cx="${x}" cy="${y}" r="4.4" fill="#3A2317"/>`,
    b:`<circle cx="${x}" cy="${y}" r="4.2" fill="#FF8FB1"/><circle cx="${x+1}" cy="${y-6}" r="3.6" fill="#FFC857"/>`,
    j:`<rect x="${x-4}" y="${y-4}" width="8" height="8" rx="2" fill="#fff" fill-opacity=".8"/><rect x="${x+2}" y="${y-9}" width="7" height="7" rx="2" fill="#fff" fill-opacity=".7"/>`,
    g:`<rect x="${x-4}" y="${y-4}" width="8" height="8" rx="2" fill="#2B2B33"/><rect x="${x+2}" y="${y-9}" width="7" height="7" rx="2" fill="#3A3A46"/>`,
    e:`<rect x="${x-5}" y="${y-5}" width="11" height="10" rx="3" fill="#FFD76A"/>`,
    r:`<ellipse cx="${x}" cy="${y}" rx="3.6" ry="2.6" fill="#8E2F3C"/><ellipse cx="${x+5}" cy="${y-5}" rx="3.6" ry="2.6" fill="#A33B49"/>`,
    o:`<polygon points="${x-5},${y+3} ${x-2},${y-4} ${x+4},${y-2} ${x+5},${y+4}" fill="#3B3340"/><polygon points="${x+2},${y-6} ${x+8},${y-8} ${x+8},${y-3}" fill="#52495A"/>`,
    s:`<rect x="${x-3}" y="${y-8}" width="5" height="14" rx="2.5" fill="#7A4A25" fill-opacity=".85"/>`
  })[kind] || '';

  const colors = () => {
    const b = find(D.base, S.base)[3], f = find(D.flavour, S.flavour);
    return f[3] || b;
  };
  const cup = () => {
    const [c1, c2] = colors(), foam = S.tops.some((t) => ['cheese','mfoam'].includes(t));
    const y0 = foam ? 56 : 50, hot = S.ice === 'warm';
    let o = `<svg viewBox="0 0 200 125" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Preview of your drink"><rect width="200" height="125" fill="${c1}" fill-opacity=".38"/><circle cx="28" cy="102" r="42" fill="${c2}" fill-opacity=".2"/><circle cx="178" cy="28" r="30" fill="${c1}" fill-opacity=".45"/>`;
    o += `<line x1="104" y1="36" x2="119" y2="9" stroke="#FF6F91" stroke-width="5" stroke-linecap="round"/>`;
    o += poly(y0, 82, c1) + poly(82, 114, c2);
    if (foam) o += `<rect x="${xl(44)+1}" y="44" width="${200-2*xl(44)-2}" height="14" rx="6" fill="${S.tops.includes('mfoam') ? '#CFE6A4' : '#fff'}" fill-opacity=".96"/>`;
    if (S.ice === 'regular' || S.ice === 'less') {
      o += '<g fill="#fff" fill-opacity=".38"><rect x="84" y="62" width="14" height="14" rx="3" transform="rotate(-10 91 69)"/>' + (S.ice === 'regular' ? '<rect x="104" y="70" width="14" height="14" rx="3" transform="rotate(12 111 77)"/><rect x="92" y="88" width="13" height="13" rx="3"/>' : '') + '</g>';
    }
    if (hot) o += '<g fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="2.5" stroke-linecap="round"><path d="M88 26c-4-5 4-8 0-13"/><path d="M100 26c-4-5 4-8 0-13"/></g>';
    S.tops.filter((t) => !['cheese','mfoam'].includes(t)).forEach((t, i) => { const k = find(allTops, t)[3]; o += topSvg(k, 90 + i * 14, 107) + topSvg(k, 97 + i * 14, 98); });
    o += `<polygon points="70,40 130,40 121,114 79,114" fill="#fff" fill-opacity=".22" stroke="#fff" stroke-opacity=".95" stroke-width="2.5" stroke-linejoin="round"/><rect x="65" y="33" width="70" height="8" rx="4" fill="#fff"/><line x1="80" y1="54" x2="85" y2="104" stroke="#fff" stroke-opacity=".6" stroke-width="3" stroke-linecap="round"/></svg>`;
    return o;
  };

  
  const price = (st = S) => {
    const sz = find(D.size, st.size)[3], b = find(D.base, st.base)[2], f = find(D.flavour, st.flavour)[2], m = find(D.milk, st.milk)[2];
    return sz + b + f + m + st.tops.reduce((a, t) => a + find(allTops, t)[2], 0);
  };
  const lines = () => [
    ['Size', find(D.size, S.size)[1] + ' · ' + find(D.size, S.size)[2]],
    ['Tea base', find(D.base, S.base)[1]],
    ['Flavour', find(D.flavour, S.flavour)[1]],
    ['Milk', find(D.milk, S.milk)[1]],
    ['Sweetness', S.sweet + '%'],
    ['Ice', find(D.ice, S.ice)[1]],
    ['Toppings', S.tops.length ? S.tops.map((t) => find(allTops, t)[1]).join(', ') : 'None']
  ];
  const name = () => {
    const f = find(D.flavour, S.flavour), b = find(D.base, S.base);
    const m = find(D.milk, S.milk)[1].toLowerCase();
    return (f[0] === 'plain' ? '' : f[1] + ' ') + b[1].replace(' (ice blend)', ' blend') + (S.milk === 'none' ? '' : ' with ' + m);
  };
  const update = () => {
    document.getElementById('cu-cup').innerHTML = cup();
    document.getElementById('cu-name').textContent = name();
    document.getElementById('cu-lines').innerHTML = lines().map((l) => `<div><dt>${l[0]}</dt><dd>${l[1]}</dd></div>`).join('');
    document.getElementById('cu-price').textContent = rs(price());
    root.querySelectorAll('input[name="tops"]').forEach((i) => { i.disabled = !i.checked && S.tops.length >= D.max; });
    document.getElementById('cu-sum').classList.remove('ordered');
  };
  root.addEventListener('change', (e) => {
    const i = e.target;
    if (i.name === 'tops') S.tops = [...root.querySelectorAll('input[name="tops"]:checked')].map((x) => x.value);
    else S[i.name] = i.name === 'sweet' ? +i.value : i.value;
    update();
  });

  
  const presets = {
    taro:{ base:'black', flavour:'taro', milk:'fresh', sweet:50, ice:'regular', tops:['tapioca'] },
    brown:{ base:'black', flavour:'brownsugar', milk:'fresh', sweet:50, ice:'less', tops:['tapioca'] },
    mango:{ base:'jasmine', flavour:'mango', milk:'none', sweet:25, ice:'regular', tops:['popping'] },
    matcha:{ base:'matcha', flavour:'plain', milk:'oat', sweet:25, ice:'regular', tops:['cheese'] }
  };
  const apply = (obj) => {
    S = Object.assign(start(), obj);
    ['size','base','flavour','milk','sweet','ice'].forEach((k) => { const r = root.querySelector(`input[name="${k}"][value="${S[k]}"]`); if (r) r.checked = true; });
    root.querySelectorAll('input[name="tops"]').forEach((c) => { c.checked = S.tops.includes(c.value); });
    update();
  };
  const combos = [['taro','Taro pearl milk tea','Taro, black tea, fresh milk, tapioca pearls'],['brown','Brown sugar pearl','Brown sugar, black tea, less ice, tapioca pearls'],['mango','Mango green tea','Mango, jasmine green, popping boba'],['matcha','Matcha cheese foam','Matcha, oat milk, cheese foam']];
  document.getElementById('cu-combos').insertAdjacentHTML('beforeend', combos.map((c) => `<button type="button" class="cu-combo" data-preset="${c[0]}"><span><b>${c[1]}</b><small>${c[2]}</small></span><em>${rs(price(Object.assign(start(), presets[c[0]])))}</em></button>`).join(''));
  document.querySelectorAll('[data-preset]').forEach((b) => b.addEventListener('click', () => { apply(presets[b.dataset.preset]); document.getElementById('cu-steps').scrollIntoView(); }));
  document.getElementById('cu-reset').addEventListener('click', () => apply({}));
  document.getElementById('cu-order').addEventListener('click', () => {
    document.getElementById('cu-done-name').textContent = name() + ' · ' + document.getElementById('cu-price').textContent;
    document.getElementById('cu-sum').classList.add('ordered');
  });
  document.getElementById('cu-again').addEventListener('click', () => document.getElementById('cu-sum').classList.remove('ordered'));
  update();
})();



(function(){
  var card=document.getElementById('hv-card'); if(!card) return;
  var tabs=[].slice.call(card.querySelectorAll('[role=tab]'));
  function select(i,focus){
    tabs.forEach(function(t,k){
      var on=k===i;
      t.setAttribute('aria-selected',on); t.tabIndex=on?0:-1;
      document.getElementById(t.getAttribute('aria-controls')).hidden=!on;
    });
    if(focus) tabs[i].focus();
  }
  tabs.forEach(function(t,i){
    t.addEventListener('click',function(){ select(i); });
    t.addEventListener('keydown',function(e){
      var d={ArrowRight:1,ArrowLeft:-1}[e.key];
      if(d===undefined) return;
      if(document.documentElement.dir==='rtl') d=-d;
      e.preventDefault(); select((i+d+tabs.length)%tabs.length,true);
    });
  });
  var range=document.getElementById('hv-range'), out=document.getElementById('hv-out'), dots=card.querySelectorAll('#hv-dots i');
  var names={0:'No sugar',25:'Light',50:'Half sweet',75:'Sweet',100:'Full sweet'};
  function sweet(){
    var v=+range.value;
    out.innerHTML='<b>'+v+'%</b>'+names[v];
    dots.forEach(function(d,k){ d.classList.toggle('on',k<v/25); });
  }
  range.addEventListener('input',sweet); sweet();
})();
