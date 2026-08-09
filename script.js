// Ambient petals
  const petalContainer = document.getElementById('petals');
  const PETAL_COUNT = 22;
  for (let i = 0; i < PETAL_COUNT; i++) {
    const p = document.createElement('div');
    p.className = 'petal';
    const left = Math.random() * 100;
    const duration = 9 + Math.random() * 10;
    const delay = Math.random() * 12;
    const size = 8 + Math.random() * 10;
    p.style.left = left + 'vw';
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.animationDuration = duration + 's';
    p.style.animationDelay = delay + 's';
    petalContainer.appendChild(p);
  }

  // Envelope open interaction
  const envelope = document.getElementById('envelope');
  const hero = document.getElementById('hero');
  const letterPage = document.getElementById('letterPage');

  function openLetter() {
    if (envelope.classList.contains('open')) return;
    envelope.classList.add('open');
    // add an `opened` class after the flap transition completes
    const flap = envelope.querySelector('.flap');
    if (flap) {
      const onTransitionEnd = (e) => {
        if (e.target === flap && e.propertyName && e.propertyName.includes('transform')) {
          envelope.classList.add('opened');
          flap.removeEventListener('transitionend', onTransitionEnd);
        }
      };
      flap.addEventListener('transitionend', onTransitionEnd);
      // fallback in case transitionend doesn't fire (reduced motion or timing issues)
      setTimeout(() => envelope.classList.add('opened'), 950);
    } else {
      envelope.classList.add('opened');
    }
    playMusic();
    setTimeout(() => {
      hero.classList.add('hidden');
      letterPage.classList.add('visible');
      letterPage.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 750);
  }

  envelope.addEventListener('click', openLetter);
  envelope.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openLetter();
    }
  });

  // Background music
  const bgMusic = document.getElementById('bgMusic');
  const musicToggle = document.getElementById('musicToggle');
  const musicIcon = document.getElementById('musicIcon');

  bgMusic.volume = 0.45;

  function playMusic() {
    bgMusic.play().then(() => {
      musicToggle.classList.add('playing');
      musicToggle.setAttribute('aria-pressed', 'true');
      musicToggle.setAttribute('aria-label', 'Pause music');
      musicIcon.textContent = '♪';
    }).catch(() => {
      // Autoplay blocked; user can press the toggle manually
    });
  }

  function pauseMusic() {
    bgMusic.pause();
    musicToggle.classList.remove('playing');
    musicToggle.setAttribute('aria-pressed', 'false');
    musicToggle.setAttribute('aria-label', 'Play music');
    musicIcon.textContent = '♪';
  }

  musicToggle.addEventListener('click', () => {
    if (bgMusic.paused) {
      playMusic();
    } else {
      pauseMusic();
    }
  });

  // Closing button
  const askBtn = document.getElementById('askBtn');
  const response = document.getElementById('response');
  const lines = [
    "Thank you for reading this far.",
    "I'll text you — no pressure to reply right away.",
    "Whenever you're ready, I'm here."
  ];
  let clicks = 0;
  askBtn.addEventListener('click', () => {
    response.textContent = lines[Math.min(clicks, lines.length - 1)];
    clicks++;
  });