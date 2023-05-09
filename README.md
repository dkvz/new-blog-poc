# DkVZ.eu Blog 3.0 Design Expriments

The entire process should be mobile first this time around. Test with tablet size or smaller.

The `src` folder has the work in progress. You can find previous versions at the commit right before a tagged version on git. And by "you" I mean me.

-> At some point I started using tags (git tags). Here's a list:
- v1.0 : First draft for colors, missing a lot of stuff and still using purple as primary - Which I think I should change.
- v0.2 : Yeah I messed up. That's when I deleted the "version0.1" directory.

## Fonts
I started out with sans-serif, have not figured anything out yet but I probably won't use a downloadable font.

## Colors
  * Teal
    * rgb(78, 205, 196)
    * rgb(92, 181, 161) (logrocket)
  * Purple
    * rgb(126, 80, 190)
    * rgb(118, 74, 188) (logrocket)
    * rgb(103, 58, 184) (Preact)
    * rgb(110, 96, 204) (Insomnia)
  * Red-pink
    * rgb(219, 48, 105)
  * Bluegray
    * rgb(70, 70, 85)
    * rgb(68, 68, 68) (code background)
    * radial-gradient(circle at 50% 50%, rgb(41, 42, 38), rgb(29, 30, 27) 400%)
  * Sand-orange
    * rgb(230, 180, 95)
  * Silver
    * rgb(238, 238, 238)

This works alright:
```css
:root {
  --primary-color: rgb(110, 96, 204);
  --accent-color: rgb(219, 48, 105);
  --ui-color: rgb(78, 205, 196);
  --secondary-color: cornsilk;
  --light-color: #fff;
  /*--dark-color: #555;*/
  --dark-color: rgb(68, 68, 68);
  --main-padding: 0.6rem;
  --content-padding: 0.6rem;
  --card-padding: 0.7rem;
}
```

I like that page: https://en.wikipedia.org/wiki/Web_colors

## SVGs in top bar
I thought of inlining a very compressed version then load the full one and replace the SVG content with it when loaded.

Another plan would be to still use an img tag and use a CSS filter for colors and animations.

However I think I kind of have to use inline for what I want to do.

### Getting maximum compression
For Inkscape.
* Make sure to use File -> Clean up document
* Select paths that could be simplified and not look too ugly and hit Path -> Simplify
* Document properties: Set unit to px

To save the SVG, use Save a Copy, pick "Optimized SVG" and use these options (not sure if super optimal but it works):
* Shorten color values
* Conver CSS to XML
* Collapse groups
* Create groups for similar thingies
* Work around renderer bugs

* Remove metadata
* Remove comments
* Embed raster images (for what that's worth)
* Enable viewboxing

* Remove unused ids
* Shorten IDs

## Original button style
```css
.btn {
  background-color: var(--ui-color);
  color: var(--accent-color);
  font-weight: bolder;
  padding: 0.4rem;
  font-size: 1.1rem;
  border-radius: 5px;
  border: none;
  box-shadow: var(--ui-shadow);
}
```

## Specialized components

### Loader
A simple stupid rotate could be the base idea for a loader: https://codepen.io/dkvz/pen/LXMaLV

### Cards
I could copy the cards from:
* http://materialdesignblog.com/10-material-design-cards-for-web-in-css-html/
* https://www.w3schools.com/w3css/w3css_cards.asp

This codepen has a cool floating date pill:
https://codepen.io/andytran/pen/BNjymy

The hover that reveals the description would've been cool except hover is not a thing on mobile so I'm not doing that.

I'm currently thinking of having a huge outline on cards too. There's a todo item to put it on the links at the card bottom, I'll probably start with that.

### Menu
I thought I'd use a big modal triggered by a checkbox triggered by a label so that it sort of works without JS.

See this gist: https://gist.github.com/dkvz/964e76375e80c466e37c85b9bb5bc081

We can even have multiple labels for the same checkbox, as far as I know it's allowed.

The div with class header__menu-container has to become the label. It needs a sibling that's position fixed, we could use left right top and bottom set to 0, it seems that this makes it take the whole screen.

### Display woes
Transitions do not like `display: none`. To use it with transition I need some JS and setTimeout magic. The problem is to layer that on top of it working with JS disabled using the checkbox, and the checkbox uses display. So ideally... I'd have to remove the checkbox and its reference in the label if JS is enabled, which is kind of ugly.

**Change of plan**: I could use visibility instead of display so that the nav is actually visible to screen reader. I just have to make sure the animation is not running while it's hidden and we should be fine in terms of CPU.

In that case I can probably hack something together with a transition delay on visibility.

- Change the background color to be similar to the header one
- The JS that changes MENU to CLOSE should be bound the the checkbox

### Trying to load img-lightbox using unpkg
It's supposed to be at:
https://unpkg.com/@dkvz/img-lightbox

Which redirects to: https://unpkg.com/@dkvz/img-lightbox@0.2.0/dist/img-lightbox.js

Just add the script like so:
```html
<script src="https://unpkg.com/@dkvz/img-lightbox@0.2.0/dist/img-lightbox.js"></script>
<script>
  customElements.define('img-lightbox', ImgLightbox.default);
</script> 
```

# TODO
- [x] Add the full size svg in noscript tags.
- [ ] Socials should be in the menu.
- [ ] My typography is usually bad, especially on large screens.
- [x] Reconcile menu code in article.html.
- [ ] Always check reader mode - I had issues with my icons not having a fixed size.
- [ ] Les paragraphes doivent être bien plus aérés pour les articles - Encore plus sur grand écran.
- [x] The menu button transition no longer works.
- [x] Main hero title size has to be smaller on small screens.
- [ ] The shrimps need to be constrained to the "container size" and/or I really need to add more of them for larger screens.
- [x] Opening the menu has to activate a global body overlay with JS. I'm going to use an attribute on body as I've already done in other projects.
- [x] I can do the good old effect where the article round image sticks out from the top.
- [x] I need the date, read more, and comment icons.
- [ ] Article title color is wrong. Another font would also be nice for it -> I need to pick a font for article content too.
- [ ] Ajouter une icone pour le lien flux RSS du footer, pour bien faire faudrait le mettre en orange aussi.
- [ ] The controls to read more or go to comments for article cards should probably be links instead of buttons. I think.
- [x] Just use BEM for once.
- [x] Get more hero__img variation classes to get the right stroke-width or fix it using a style attribute.
- [ ] I removed the debouncing for the scroll event, but we could just make an extra check in the setTimeout callback to possibly reset the sticky status.
- [x] Hover on cards with images on top: can try animating the background zooming and moving slightly.
  * Use use a hover animation such as the one here: https://beautifuldingbats.com
- [x] Search input could have bigger text and more padding.
- [ ] Cards normally have a "bubble" animation on click. Same for buttons.
- [ ] We could have the last shorts in a section that can be expanded to see more, same for articles. Of course, expanding should be animated. That way we could only have a few "last shorts" and "last articles". The expansion thing can be mounted as a (or part of a) component so that it's not visible when JS is disabled. The first few items shown are also server rendered when necessary.
- [x] The menu has to work with Javascript disabled - I'm thinking of using the input checked trick. Plan B would have to have a second menu in a <noscript> tag.
- [x] Header shouldn't be fixed this time around but I'm going to do something hybrid and hide-fade + padding transition it out at a certain point. It'll still be fixed if JS is disabled. Currently trying: transparent header into solid into removing it with transition.
- [ ] Use CSS-grid (maybe with flex as the fallback) to have a mandatory grid-gap between the shrimps when we resize the width down.
- [x] Add an outline on focused buttons. Very important for keyboard nav accessibility.
- [ ] Also put a big outline (similar to the button one) on links - Escpecially the card links at the bottom.
- [ ] If I want to do images homemade, there is such a thing as a SVG sprite: https://css-tricks.com/change-color-of-svg-on-hover/#article-header-id-1
- [ ] Need to test everything on Chrome!
- [ ] Add a special media query for super giga tiny screens. The CTA could use that one.
- [ ] Hero has to be much better on the main page. I need some kind of image or graphics in it. Something to do with SVG.
  * Can I use a SVG to create the bottom part and do some kind of cutting-wavy line or something?
  * Or there's the good old cutting a circle and putting the shrimp in it, on top of the hero.
  * Solid background color + shrimp cut out in it in SVG (white or dark shrimp - no colors) - Or multiple shrimps. -> That would be cool, I can animate that background.
- [x] Figure out where to put the menu button, wheel or whatever it's going to be.
- [ ] The header can have both a home button and the menu icon. Both needs some good hover transitions. Actually it should have a twitter button first. Don't know how much I can fit on mobile.
  - [x] Home button will be the header title
- [ ] Add more drop shadows for the footer, it's got holes at both sides, I think we need 3 shadows.
