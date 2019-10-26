const heroImages = document.querySelectorAll('.hero__img');
const images = ['img/shrimp_plain1.svg', 'img/shrimp_plain2.svg'];

function replaceHeroImages() {
  heroImages.forEach((e, i) => {
    fetch(images[i % heroImages.length])
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
                if (newVb) e.setAttribute('viewBox', newVb);
                e.innerHTML = svgEl.innerHTML;
              }
            }
          );
        }
      });
  });
}

// Delay the replacement just to see it in dev mode.
setTimeout(replaceHeroImages, 4000);