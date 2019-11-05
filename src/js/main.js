const heroImages = document.querySelectorAll('.hero__img'),
  menuBtn = document.querySelector('.menu-btn'),
  header = document.querySelector('.header');
const images = [
  {
    src: 'img/shrimp_plain1.svg'
  },
  {
    src: 'img/shrimp_plain2.svg',
    className: 'hero__img--v2-loaded'
  }
];

const dynamicNav = {
  stickyClass: 'header--sticky',
  sticky: false,
  waiting: false,
  init: function(el) {
    this.el = el;
    this.stickT = el.getBoundingClientRect ? 
      el.getBoundingClientRect().height : 150;
    this.hideT = this.stickT * 4;
    this.sticky = false;
    window.addEventListener(
      'scroll', 
      this.onScroll.bind(this)
    );
  },
  debug: function(action) {
    console.log(`hideT = ${this.hideT} - stickT = ${this.stickT}`);
    console.log(`${action} - Offset: ${window.pageYOffset}`);
  },
  onScroll: function() {
    if (this.waiting) return;
    if (this.sticky && 
      (window.pageYOffset > this.hideT || 
        window.pageYOffset <= this.stickT)) {
      // Hide the menu (reset its position)
      this.el.style.transform = 'scaleY(0)';
      setTimeout(() => {
        this.el.style.transform = '';
        this.el.classList.remove(this.stickyClass);
        this.sticky = false;
        //this.debug('Removed');
      }, 400);
    } else if (!this.sticky && 
        window.pageYOffset > this.stickT && 
        window.pageYOffset <= this.hideT) {
      // Sticky the menu
      this.el.classList.add(this.stickyClass);
      // TODO: I don't know if this is necessary:
      this.el.style.opacity = 0.4;
      setTimeout(() => this.el.style.opacity = 1, 300);
      // --
      this.sticky = true;
      //this.debug('Added');
    }
    this.waiting = true;
    // My attempt to debounce this event.
    setTimeout(() => this.waiting = false, 200);
  }
};

function replaceHeroImages() {
  heroImages.forEach((e, i) => {
    const currentImg = images[i % heroImages.length];
    fetch(currentImg.src)
      .then(resp => {
        if (resp.status >= 200 && resp.status < 300) {
          resp.text().then(
            data => {
              const temp = document.createElement('div');
              temp.innerHTML = data;
              const svgEl = temp.firstElementChild;
              if (temp.firstElementChild.nodeName === 'svg') {
                // Duplicate the viewBox:
                const newVb = temp.firstElementChild.getAttribute('viewBox');
                if (newVb) 
                  e.setAttribute('viewBox', newVb);
                if (currentImg.className) 
                  e.classList.add(currentImg.className);
                e.innerHTML = svgEl.innerHTML;
              }
            }
          );
        }
      });
  });
}

// Delay the replacement just to see it in dev mode.
setTimeout(replaceHeroImages, 3000);

menuBtn.addEventListener('click', (e) => {
  const span = e.currentTarget.querySelector('span');
  if (e.currentTarget.classList.contains('open')) {
    e.currentTarget.classList.remove('open');
    span.textContent = 'Menu';
  } else {
    e.currentTarget.classList.add('open');
    span.textContent = 'Fermer';
  }
})

dynamicNav.init(header);
