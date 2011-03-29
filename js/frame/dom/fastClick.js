
goog.provide('frame.dom.FastClick');

goog.require('goog.events');


frame.dom.fastClicks = {};

frame.dom.addFastClick = function(element, handler, that) {
    frame.dom.fastClicks[element] = frame.dom.fastClicks[element] || {};
    frame.dom.fastClicks[element][handler] = new frame.dom.FastClick(element, handler, that);
};

frame.dom.removeFastClick = function(element, handler) {
    frame.dom.fastClicks[element][handler].reset();
    frame.dom.fastClicks[element][handler] = null;
};

/** @constructor */
frame.dom.FastClick = function(element, handler, that) {
    this.element = element;
    this.handler = handler;
    this.that = that;

    element.addEventListener('touchstart', this, false);
    element.addEventListener('click', this, false);
};

frame.dom.FastClick.prototype.handleEvent = function(event) {
    switch (event.type) {
        case 'touchstart': this.onTouchStart(event); break;
        case 'touchmove': this.onTouchMove(event); break;
        case 'touchend': this.onClick(event); break;
        case 'click': this.onClick(event); break;
    }
};

frame.dom.FastClick.prototype.onTouchStart = function(event) {
    event.stopPropagation();

    this.element.addEventListener('touchend', this, false);
    document.addEventListener('touchmove', this, false);

    this.startX = event.touches[0].clientX;
    this.startY = event.touches[0].clientY;
};

frame.dom.FastClick.prototype.onTouchMove = function(event) {
  if (Math.abs(event.touches[0].clientX - this.startX) > 10 ||
      Math.abs(event.touches[0].clientY - this.startY) > 10) {
    this.reset();
  }
};

frame.dom.FastClick.prototype.onClick = function(event) {
    event.stopPropagation();
    this.reset();
    this.handler.call(this.that, event);

    if (event.type == 'touchend') {
        frame.dom.preventGhostClick(this.startX, this.startY);
    }
};

frame.dom.FastClick.prototype.reset = function() {
    this.element.removeEventListener('touchend', this, false);
    document.removeEventListener('touchmove', this, false);
};


frame.dom.preventGhostClick = function(x, y) {
    frame.dom.clickbuster.coordinates.push(x, y);
    window.setTimeout(frame.dom.clickbuster.pop, 2500);
};

frame.dom.clickbuster = {};
frame.dom.clickbuster.pop = function() {
    frame.dom.clickbuster.coordinates.splice(0, 2);
};


frame.dom.clickbuster.onClick = function(event) {
    for (var i = 0; i < frame.dom.clickbuster.coordinates.length; i += 2) {
        var x = frame.dom.clickbuster.coordinates[i];
        var y = frame.dom.clickbuster.coordinates[i + 1];
        if (Math.abs(event.clientX - x) < 25 && Math.abs(event.clientY - y) < 25) {
            event.stopPropagation();
            event.preventDefault();
        }
    }
};

document.addEventListener('click', frame.dom.clickbuster.onClick, true);
frame.dom.clickbuster.coordinates = [];
