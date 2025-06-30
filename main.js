document.addEventListener("DOMContentLoaded", function() {

  // ======================================================
  // LOGIKA 1: ANIMASI ELEMEN SAAT SCROLL (SUDAH ADA)
  // ======================================================
  const animObserverOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const animObserverCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.delay || '0ms';
        el.style.transitionDelay = delay;
        el.classList.add('is-visible');
        observer.unobserve(el);
      }
    });
  };

  const animObserver = new IntersectionObserver(animObserverCallback, animObserverOptions);
  const elementsToAnimate = document.querySelectorAll('.anim-trigger');
  elementsToAnimate.forEach(el => {
    animObserver.observe(el);
  });


  // ======================================================
  // LOGIKA 2: NAVBAR ACTIVE LINK SAAT SCROLL (SUDAH ADA)
  // ======================================================
  const navLinks = document.querySelectorAll('.nav--menu a');
  const sections = document.querySelectorAll('div[id]');

  const navObserverOptions = {
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0
  };

  const navObserverCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id;
        navLinks.forEach(link => {
          link.classList.remove('active-link');
        });

        const activeLink = document.querySelector(`.nav--menu a[href="#${sectionId}"]`);
        if (activeLink) {
          activeLink.classList.add('active-link');
        }
      }
    });
  };

  const navObserver = new IntersectionObserver(navObserverCallback, navObserverOptions);
  sections.forEach(section => {
    navObserver.observe(section);
  });

  
  // ======================================================
  // LOGIKA 3: ANIMASI TEKS MENGETIK (BARU DITAMBAHKAN)
  // ======================================================

  const animatedTextElement = document.getElementById('animated-text');
  
  if (animatedTextElement) {
    const words = ['home', 'features', 'social-media'];

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typingSpeed = 150;
    const deletingSpeed = 100;
    const delayAfterTyping = 2000;

    function typeAnimation() {
        const currentWord = words[wordIndex];
        
        if (!isDeleting) {
            animatedTextElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === currentWord.length) {
                isDeleting = true;
                setTimeout(typeAnimation, delayAfterTyping);
                return;
            }
        } else {
            animatedTextElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }
        }
        
        const speed = isDeleting ? deletingSpeed : typingSpeed;
        setTimeout(typeAnimation, speed);
    }

    typeAnimation();
  }

});
