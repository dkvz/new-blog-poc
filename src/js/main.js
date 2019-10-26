const heroImages = document.querySelectorAll('.hero__img');
const images = [
  {
    src: 'img/shrimp_plain1.svg'
  },
  {
    src: 'img/shrimp_plain2.svg',
    className: 'hero__img--v2-loaded'
  }
];

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
setTimeout(replaceHeroImages, 3200);