(() => {
  const root = document.documentElement;
  const toggle = document.createElement('button');
  toggle.className = 'retro-toggle';
  toggle.type = 'button';
  toggle.textContent = 'Retro';
  toggle.title = 'Toggle Windows 95 theme';
  (document.querySelector('.site-thanks') || document.body).append(toggle);
  // Tiny bitmap icons retain hard pixel edges when enlarged.
  const colors = { k: '#000', w: '#fff', g: '#c0c0c0', b: '#000080', t: '#00ffff', y: '#ffff00' };
  const patterns = {
    computer: ['..kkkkkkkkkkkk..','..kwwwwwwwwwgk..','..kwbbbbbbbbgk..','..kwbtttttbbgk..','..kwbtbbbbbbgk..','..kwbbbbbbbbgk..','..kggggggggggk..','..kkkkkkkkkkkk..','......kggk......','...kkkkkkkkkk...','..kwwwwwwwwwgk..','.kggggggggggggk.','.kkkkkkkkkkkkkk.'],
    folder: ['................','..kkkkkk........','..kyyyyk........','.kwwwwwkkkkkkk..','.kwyyyyyyyyyyyk.','.kwyyyyyyyyyyyk.','.kwyyyyyyyyyyyk.','.kwyyyyyyyyyyyk.','.kwyyyyyyyyyyyk.','.kwyyyyyyyyyyyk.','.kggggggggggggk.','.kkkkkkkkkkkkkk.'],
    photo: ['................','.kkkkkkkkkkkkkk.','.kwwwwwwwwwwwwk.','.kwbbbbbbbbbbwk.','.kwbbbyybbbbbwk.','.kwbbbyybbbbbwk.','.kwbbbbbbbbbbwk.','.kwbbggbbgbbbwk.','.kwbgggggggbbwk.','.kwggggggggggwk.','.kwwwwwwwwwwwwk.','.kkkkkkkkkkkkkk.'],
    mail: ['................','................','.kkkkkkkkkkkkkk.','.kwwwwwwwwwwwwk.','.kwkwwwwwwwwkwk.','.kwwkwwwwwwkwwk.','.kwwwkwwwwkwwwk.','.kwwwwkkkkwwwwk.','.kwwwkwwwwkwwwk.','.kwwkwwwwwwkwwk.','.kggggggggggggk.','.kkkkkkkkkkkkkk.']
  };
  function icon(name) {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 16;
    const ctx = canvas.getContext('2d');
    patterns[name].forEach((row, y) => [...row].forEach((p, x) => {
      if (colors[p]) { ctx.fillStyle = colors[p]; ctx.fillRect(x, y, 1, 1); }
    }));
    const img = new Image();
    img.src = canvas.toDataURL(); img.alt = ''; img.className = 'retro-icon';
    return img;
  }
  toggle.prepend(icon('computer'));
  const navigation = document.querySelector('.site-nav');
  function alignDesktopRetroToggle() {
    const centeredTop = navigation.offsetTop + (navigation.offsetHeight - toggle.offsetHeight) / 2;
    root.style.setProperty('--desktop-retro-top', `${centeredTop}px`);
  }
  new ResizeObserver(alignDesktopRetroToggle).observe(navigation);
  window.addEventListener('resize', alignDesktopRetroToggle);
  alignDesktopRetroToggle();
  [['.hero','Welcome to Reid.exe','computer'],['.about','reid.exe','computer'],['.projects','My Projects','folder'],['.tech-stack','System Properties','computer'],['.photography','My Pictures','photo'],['.contact','Outlook Express','mail']].forEach(([selector,title,symbol]) => {
    const bar = document.createElement('div');
    bar.className = 'retro-titlebar';
    bar.append(icon(symbol));
    if (selector !== '.hero') bar.append(document.createTextNode(title));
    if (selector === '.hero') {
      const note = document.createElement('span');
      note.className = 'retro-welcome-note';
      note.textContent = 'See what it would look like if I graduated in 1996 instead of 2026!';
      bar.append(note);
    }
    const close = document.createElement('button');
    close.className = 'retro-header-close';
    close.type = 'button';
    close.textContent = 'x';
    close.title = 'Close ' + title + ' header';
    close.setAttribute('aria-label', close.title);
    close.addEventListener('click', () => {
      bar.hidden = true;
      const heading = bar.parentElement.querySelector('h1,h2');
      heading.setAttribute('tabindex', '-1');
      heading.focus({preventScroll:true});
    });
    bar.append(close);
    document.querySelector(selector).prepend(bar);
  });
  document.querySelectorAll('.site-nav a').forEach((link,i) => link.prepend(icon(['computer','folder','computer','photo','mail'][i])));
  const taskbar = document.createElement('div'); taskbar.className = 'retro-taskbar';
  const start = document.createElement('a'); start.href = '#top';
  start.append(icon('computer'),document.createTextNode('Start'));
  const task = document.createElement('span'); task.textContent = 'Reid Castillo';
  const clock = document.createElement('time');
  function updateClock() { clock.textContent = new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'}); }
  updateClock(); setInterval(updateClock,60000);
  taskbar.append(start,task,clock); document.body.append(taskbar);
  const previews = [...document.querySelectorAll('.photo-print img')].map(img => ({ img, original: img.getAttribute('src'), pixel: null }));
  function updatePreviews(enabled) {
    previews.forEach(entry => {
      if (!enabled) { entry.img.src = entry.original; return; }
      if (entry.pixel) { entry.img.src = entry.pixel; return; }
      const source = new Image();
      source.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 96;
        canvas.height = Math.round(96 * source.naturalHeight / source.naturalWidth);
        canvas.getContext('2d').drawImage(source, 0, 0, canvas.width, canvas.height);
        try {
          entry.pixel = canvas.toDataURL();
          if (root.classList.contains('retro')) entry.img.src = entry.pixel;
        } catch {}
      };
      source.src = entry.original;
    });
  }
  function setRetro(enabled) {
    root.classList.toggle('retro',enabled);
    requestAnimationFrame(alignDesktopRetroToggle);
    if (enabled) document.querySelectorAll('.retro-titlebar').forEach(bar => { bar.hidden = false; });
    updatePreviews(enabled);
    toggle.setAttribute('aria-pressed',String(enabled));
    toggle.setAttribute('aria-label',enabled ? 'Turn off Retro mode' : 'Turn on Retro mode');
    try { localStorage.setItem('site-retro',String(enabled)); } catch {}
  }
  let saved = false;
  try { saved = localStorage.getItem('site-retro') === 'true'; } catch {}
  setRetro(saved);
  toggle.addEventListener('click',() => setRetro(!root.classList.contains('retro')));

  document.querySelectorAll('.project-slip').forEach(slip => {
    const folder = icon('folder');
    folder.classList.add('retro-folder');
    slip.prepend(folder);
  });
  const pixelStyles = document.createElement('style');
  document.head.append(pixelStyles);
  const faces = {front:'square',right:'orange',back:'blue',top:'white',left:'red',bottom:'green'};
  Object.entries(faces).forEach(([face,file]) => {
    const source = new Image();
    source.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = 48;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(source,0,0,48,48);
      try {
        pixelStyles.sheet.insertRule(':root.retro .cubie-side.photo-' + face + '{background-image:url("' + canvas.toDataURL() + '")}');
      } catch {}
    };
    source.src = 'assets/reid-cube-photo-' + file + '.png';
  });
  const arrow = document.createElement('canvas');
  arrow.width = arrow.height = 32;
  const arrowCtx = arrow.getContext('2d');
  ['k','kk','kwk','kwwk','kwwwk','kwwwwk','kwwwwwk','kwwwwwwk','kwwwwwwwk','kwwwwkkkkk','kwwkwk','kwk kwk','kk  kwk','k    kk'].forEach((row,y) => {
    [...row].forEach((p,x) => {
      if(p !== ' ') { arrowCtx.fillStyle = p === 'k' ? '#000' : '#fff'; arrowCtx.fillRect(x*2,y*2,2,2); }
    });
  });
  root.style.setProperty('--retro-cursor','url("' + arrow.toDataURL() + '") 0 0, auto');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const trail = document.createElement('div');
  trail.className = 'retro-cursor-trail';
  trail.setAttribute('aria-hidden','true');
  document.body.append(trail);
  const dots = Array.from({length:10},(_,i) => {
    const dot = document.createElement('i');
    dot.style.background = i % 2 ? '#ffff00' : '#ff3030';
    trail.append(dot);
    return {element:dot,x:0,y:0};
  });
  let frame = 0, lastMove = 0, mouseX = 0, mouseY = 0;
  function stopTrail() {
    cancelAnimationFrame(frame); frame = 0;
    dots.forEach(dot => dot.element.style.opacity = '0');
  }
  function animateTrail(now) {
    if (!root.classList.contains('retro') || reducedMotion.matches || !finePointer.matches || now-lastMove>650) { stopTrail(); return; }
    dots.forEach((dot,i) => {
      const target = i ? dots[i-1] : {x:mouseX,y:mouseY};
      dot.x += (target.x-dot.x)*0.32;
      dot.y += (target.y-dot.y)*0.32;
      const angle = now/180+i*1.8;
      dot.element.style.transform = 'translate('+(dot.x+Math.cos(angle)*7)+'px,'+(dot.y+Math.sin(angle)*7)+'px)';
      dot.element.style.opacity = String(Math.max(0,1-(now-lastMove)/650)*(1-i/14));
    });
    frame = requestAnimationFrame(animateTrail);
  }
  document.addEventListener('pointermove',event => {
    if (!root.classList.contains('retro') || !finePointer.matches || reducedMotion.matches) return;
    mouseX = event.clientX+8; mouseY = event.clientY+10; lastMove = performance.now();
    if (!frame) {
      dots.forEach(dot => {dot.x=mouseX;dot.y=mouseY;});
      frame = requestAnimationFrame(animateTrail);
    }
  },{passive:true});
  document.addEventListener('pointerleave',stopTrail);
  window.addEventListener('blur',stopTrail);
  toggle.addEventListener('click',stopTrail);

  const paper = document.createElement('canvas');
  paper.width = paper.height = 16;
  const paperCtx = paper.getContext('2d');
  const paperColors = {k:'#2d2600',y:'#ffff00',s:'#b8a000',w:'#ffff99'};
  [
    '.....kkkk.......','...kkwwyykkk....','..kwyyyysyyykk..','.kwyysyyksyyyyk.',
    '.kyyyskkyyyyysk.','kwyykywwwyyssyyk','kyyykywyykkkssyk','kyysykwwkyyyysyk',
    'kyssyykkwyssyyyk','kyyysskywyykssyk','.kyyyskywykkysk.','.kywyykkkkyyysk.',
    '..kwwyyyskyyyk..','...kyyyysyykk...','....ksssykk.....','.....kkkk.......'
  ].forEach((row,y) => [...row].forEach((p,x) => {
    if(paperColors[p]) { paperCtx.fillStyle=paperColors[p];paperCtx.fillRect(x,y,1,1); }
  }));
  root.style.setProperty('--retro-paper-ball','url("'+paper.toDataURL()+'")');

  // Match the existing bin bounds so only the artwork changes, not collisions.
  const binArt = document.createElement('canvas');
  binArt.width = binArt.height = 32;
  const binCtx = binArt.getContext('2d');
  for (let y=0;y<32;y++) {
    const inset=2+Math.floor(y/7);
    for (let x=inset;x<32-inset;x++) {
      const edge=x===inset || x===31-inset || y>=30;
      const wire=(x+y)%8===0 || (x-y+32)%8===0;
      if(edge || wire) {
        binCtx.fillStyle=edge ? '#202020' : ((x+y)%3 ? '#c0c0c0' : '#ffffff');
        binCtx.fillRect(x,y,1,1);
      }
    }
  }
  root.style.setProperty('--retro-bin-art','url("'+binArt.toDataURL()+'")');

  const smileyCanvas = document.createElement('canvas');
  smileyCanvas.width = smileyCanvas.height = 17;
  const smileyCtx = smileyCanvas.getContext('2d');
  [
    '......kkkkk......','....kkyyyyykk....','...kyyyyyyyyyk...','..kyyyyyyyyyyyk..',
    '.kyyyyyyyyyyyyyk.','.kyyykkyyykkyyyk.','kyyyykkyyykkyyyyk','kyyyyyyyyyyyyyyyk',
    'kyyyyyyyyyyyyyyyk','kyyyyyyyyyyyyyyyk','kyyykyyyyyyykyyyk','.kyyykyyyyykyyyk.',
    '.kyyyykkkkkyyyyk.','..kyyyyyyyyyyyk..','...kyyyyyyyyyk...','....kkyyyyykk....',
    '......kkkkk......'
  ].forEach((row,y) => [...row].forEach((pixel,x) => {
    if(pixel === '.') return;
    smileyCtx.fillStyle = pixel === 'k' ? '#000000' : '#ffff00';
    smileyCtx.fillRect(x,y,1,1);
  }));
  const smiley = new Image();
  smiley.className = 'retro-smiley';
  smiley.alt = '';
  smiley.width = smiley.height = 224;
  smiley.src = smileyCanvas.toDataURL();
  document.querySelector('.contact-form-intro').append(smiley);
})();
