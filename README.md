# DkVZ.eu Blog 3.0 Design Expriments

The entire process should be mobile first this time around. Test with tablet size or smaller.

The `src` folder has the work in progress. I make copies of "checkpoints" as their own directories (e.g. `version0.1`).

-> At some point I started using tags (git tags). Here's a list:
- v1.0 : First draft for colors, missing a lot of stuff and still using purple as primary - Which I think I should change.

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


## Specialized components

### Loader
A simple stupid rotate could be the base idea for a loader: https://codepen.io/dkvz/pen/LXMaLV

# TODO
- [x] Just use BEM for once.
- [x] Get more hero__img variation classes to get the right stroke-width or fix it using a style attribute.
- [ ] Header shouldn't be fixed this time around but I'm going to do something hybrid and hide-fade + padding transition it out at a certain point. It'll still be fixed if JS is disabled.
  * To try: transparent header into solid into removing it with transition.
- [ ] Use CSS-grid (maybe with flex as the fallback) to have a mandatory grid-gap between the shrimps when we resize the width down.
- [ ] Add an outline on focused buttons. Very important for keyboard nav accessibility.
- [ ] If I want to do images homemade, there is such a thing as a SVG sprite: https://css-tricks.com/change-color-of-svg-on-hover/#article-header-id-1
- [ ] Hero has to be much better on the main page. I need some kind of image or graphics in it. Something to do with SVG.
  * Can I use a SVG to create the bottom part and do some kind of cutting-wavy line or something?
  * Or there's the good old cutting a circle and putting the shrimp in it, on top of the hero.
  * Solid background color + shrimp cut out in it in SVG (white or dark shrimp - no colors) - Or multiple shrimps. -> That would be cool, I can animate that background.
- [ ] Header bg should probably be some kind of gradient.
- [ ] Figure out where to put the menu button, wheel or whatever it's going to be.
- [ ] The header can have both a home button and the menu icon. Both needs some good hover transitions. Actually it should have a twitter button first. Don't know how much I can fit on mobile.
- [ ] Can I just take the Teal, darkgrayblue and purple and sort of work with opposite colors from there?
- [ ] Remember antiquewhite ??
- [ ] Add more drop shadows for the footer, it's got holes at both sides, I think we need 3 shadows.
