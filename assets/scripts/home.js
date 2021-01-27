var sr = ScrollReveal({
  origin: "bottom",
  distance: "64px",
  duration: 800,
  delay: 0,
  scale: 1
});

sr.reveal(".projects-grid a");




const lerp = (a, b, n) => (1 - n) * a + n * b;

const distance = (x1, x2, y1, y2) => {
  var a = x1 - x2;
  var b = y1 - y2;
  return Math.hypot(a, b);
};

const getMousePos = e => {
  let posx = 0;
  let posy = 0;
  if (!e) e = window.event;
  if (e.pageX || e.pageY) {
    posx = e.pageX;
    posy = e.pageY;
  } else if (e.clientX || e.clientY) {
    posx =
      e.clientX +
      document.body.scrollLeft +
      document.documentElement.scrollLeft;
    posy =
      e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }
  return { x: posx, y: posy };
};

let winsize;
const calcWinsize = () =>
  (winsize = { width: window.innerWidth, height: window.innerHeight });
calcWinsize();
window.addEventListener("resize", calcWinsize);

class svgOverlay {
  constructor(element) {
    this.element = element;
    this.feDisplacementMapEl = this.element.querySelector("feDisplacementMap");
    this.imgEl = this.element.querySelector(".distort__img");
    this.overlayEl = this.element.querySelector(".distort__overlay");
    this.mousePos = { x: winsize.width / 2, y: winsize.height / 2 };
    this.active = false;
    this.timeout = undefined;
    this.multiplier = 0;
    
    this.lastMousePos = {
      displacement: { x: 0, y: 0 }
    };
    this.dmScale = 0;
    this.feDisplacementMapEl.scale.baseVal = this.dmScale;
    this.initEvents();
  }
  initEvents() {
    this.element.addEventListener(
      "mousemove",
      ev => {
        this.mousePos = getMousePos(ev);
      }
    );
    this.element.addEventListener(
      "mouseenter",
      () => {
        this.multiplier = 0;
        this.active = true;
        window.clearTimeout(this.timeout);
        requestAnimationFrame(() => this.render());
      }
    );
    this.element.addEventListener(
      "mouseleave",
      () => {
        this.timeout = window.setTimeout(()=> {
          this.active = false;
        }, 1000);
      }
    );
  }
  render() {
    // Scale goes from 0 to 100 for mouseDistance values between 0 to 100
    this.lastMousePos.displacement.x = lerp(
      this.lastMousePos.displacement.x,
      this.mousePos.x,
      0.1
    );
    this.lastMousePos.displacement.y = lerp(
      this.lastMousePos.displacement.y,
      this.mousePos.y,
      0.1
    );
    const mouseDistance = distance(
      this.lastMousePos.displacement.x,
      this.mousePos.x,
      this.lastMousePos.displacement.y,
      this.mousePos.y
    );
    this.dmScale = Math.min(mouseDistance, 75);
    this.feDisplacementMapEl.scale.baseVal = this.dmScale * this.multiplier;
    if(this.multiplier < 1) this.multiplier += 0.12;

    if(this.active) {
      requestAnimationFrame(() => this.render());
    }
  }
}

document.querySelectorAll(".js-block").forEach(function(e){
  new svgOverlay(e);
})