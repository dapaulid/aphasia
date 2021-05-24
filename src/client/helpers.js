function animateCSS(element, animation, prefix = 'animate__') {
  // We create a Promise and return it
  return new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;

    element.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      element.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    element.addEventListener('animationend', handleAnimationEnd, {once: true});
  });
}

class Timer {
  constructor(handler, delay) {
    this.handler = handler;
    this.delay = delay;
    this.interval = null;
    this.start();
  }

  start() {
    this.interval = setInterval(this.handler, this.delay);
  }

  stop() {
    clearInterval(this.interval);
    this.interval = null;
  }

  restart() {
    this.stop();
    this.start();
  }
}
