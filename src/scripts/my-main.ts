// require("intersection-observer");

import BrowserDetect from "./modules/BrowserDetect";
import { Accordion } from "./modules/Accordion";

/**
 * svg sprite設定
 */
// const requireAll = (r) => {
//   r.keys().forEach(r)
// };
// requireAll(require.context('../images/', true, /\.svg$/))
new BrowserDetect();

document.addEventListener(
  "DOMContentLoaded",
  () => {
    new Accordion();
  },
  false
);

// window.addEventListener('load', () => {
  // new ScrollJack();
  // scroller.init();
//   }, false
// )
