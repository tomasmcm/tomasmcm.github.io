function ready(fn) {
  if (
    document.attachEvent
      ? document.readyState === "complete"
      : document.readyState !== "loading"
  ) {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

ready(function() {
  var elements = document.querySelectorAll('.sticky');
  Stickyfill.add(elements);
  
  /*var sticky = new Sticky("[data-sticky]", {
    stickyFor: 750,
    marginTop: document.querySelector(".header").clientHeight,
    stickyClass: 'stuck'
  });*/

  /*var sidebar = new StickySidebar('[data-sticky]', {
    containerSelector: '[data-sticky-container]',
    //innerWrapperSelector: '[data-sticky-inner]',
    topSpacing: document.querySelector(".header").clientHeight,
    bottomSpacing: 50
  });*/
});

var sr = ScrollReveal({
  origin: "bottom",
  distance: "64px",
  duration: 900,
  delay: 0,
  scale: 1
});

sr.reveal(".project li");
