const heroImages = document.querySelectorAll('.hero__img');
const images = ['img/shrimp_plain1.svg', 'img/shrimp_plain2.svg'];

heroImages.forEach((e, i) => {
  fetch(images[i % heroImages.length])
    .then(resp => {
      if (resp.status >= 200 && resp.status < 300) {
        
      }
    });
});