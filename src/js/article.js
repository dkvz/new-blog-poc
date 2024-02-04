// Intersection observer to reveal images:
const artImgs = document.querySelectorAll(".article-image")

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

for (const img of artImgs) {
  img.classList.add("to-reveal")
  imgObserver.observe(img)
}

// Intersection observer to reveal titles:
const articleContent = document.querySelector(".article-content")
const titles = Array.from(articleContent.querySelectorAll(
  "h1, h2, h3, h4"
))
// Has to be uppercase for browser API reasons of the past:
const placeholderTag = "HR"

const requiresPlaceholder = (node) => 
  node.tagName === "H1" || node.tagName === "H2"

/*const toObserve = titles.map(t => {
  t.classList.add("pre-animate")
  if (requiresPlaceholder(t)) {
    // Special animation with placeholders for h1 and h2:
    const ph = document.createElement("hr")
    // Hidden doesn't work with intersection obs but 
    // CSS visibility hidden does. OKAY
    //ph.hidden = true
    ph.classList.add("animation-placeholder")
    articleContent.insertBefore(ph, t)
    return ph
  }
  return t
})*/

const titleObserver = new IntersectionObserver((entries, observer) => {
  for (const en of entries) {
    if (en.isIntersecting === true) {
      const elementRef = en.target.tagName === placeholderTag ?
        en.target.nextSibling : en.target
      
      if (!elementRef.getAttribute("data-animated")) {
        elementRef.classList.add("pre-animate-transition")
        elementRef.setAttribute("data-animated", true)
        // WE CAN UNOBSERVE A TRANSFORMED ITEM
        observer.unobserve(en.target)
        elementRef.style.opacity = 1
        elementRef.style.transform = `rotate(${0}deg) translate(0%, 0%)`
      }
    }
  }
}, 
{
  threshold: 0.25,
  root: document
})

for (const t of titles) {
  t.classList.add("pre-animate")
  if (requiresPlaceholder(t)) {
    // Special animation with placeholders for h1 and h2:
    const ph = document.createElement(placeholderTag)
    // Hidden doesn't work with intersection obs but 
    // CSS visibility hidden does. OKAY
    //ph.hidden = true
    ph.classList.add("animation-placeholder")
    articleContent.insertBefore(ph, t)
    titleObserver.observe(ph)
  } else {
    titleObserver.observe(t)
  }
}
