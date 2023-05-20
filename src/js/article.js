// Intersection observer to reveal images:
const artImgs = document.querySelectorAll(".article-image")

for (const img of artImgs) {
  img.classList.add("to-reveal")
}

const steps = 5
const incr = 1.0 / steps
const revThres = []
for (let i = 1; i <= steps; i++) {
  revThres.push(incr * i)
}

const imgObserver = new IntersectionObserver((entries, observer) => {
  for (const en of entries) {
    if (en.isIntersecting) {
      en.target.style.opacity = en.intersectionRatio
      if (en.intersectionRatio === 1) {
        observer.unobserve(en.target)
      }
    }
  }
},
{ threshold: revThres })

artImgs.forEach(a => imgObserver.observe(a))