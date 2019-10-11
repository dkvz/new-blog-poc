# DkVZ.eu Blog 3.0 Design Expriments

The entire process should be mobile first this time around. Test with tablet size or smaller.

## Fonts

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

# TODO
- [x] Just use BEM for once.
- [ ] Header shouldn't be fixed this time around but I'm going to do something hybrid and hide-fade + padding transition it out at a certain point. It'll still be fixed if JS is disabled.
  * To try: transparent header into solid into removing it with transition.
- [ ] Hero has to be much better on the main page.
- [ ] Header bg should probably be some kind of gradient.
- [ ] Figure out where to put the menu button, wheel or whatever it's going to be.
- [ ] The header can have both a home button and the menu icon. Both needs some good hover transitions. Actually it should have a twitter button first. Don't know how much I can fit on mobile.
- [ ] Can I just take the Teal, darkgrayblue and purple and sort of work with opposite colors from there?