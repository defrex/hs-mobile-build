
goog.provide('frame.dom.fx');

goog.require('frame.dom.Node');
goog.require('goog.color');
goog.require('goog.events');
goog.require('goog.fx');
goog.require('goog.fx.dom');




frame.dom.fx.toRGB = function(input){
    if (typeof hex == 'object' && hex.length == 3)
        return hex;
    return goog.color.hexToRgb(goog.color.parse(input).hex)
};


frame.dom.Node.prototype.toColor = function(color, duration, clbk, that) {
    var done = 0,
        that = that || this;
    this.each(function(n, i) {
        var anim = new goog.fx.dom.BgColorTransform(n,
                frame.dom.fx.toRGB(n.style.backgroundColor || '#ffffff'),
                color, duration);
        this.onFx(anim, function(){
            if (done++ == this.length && clbk) clbk.call(that);
        }, this);
        anim.play();
    });
    return this;
};

frame.dom.Node.prototype.onFx = function(anim, event, clbk, that) {
    if (typeof event == 'function'){
        clbk = event;
        that = clbk;
        event = undefined;
    }
    that = that || this;
    event = event == 'begin' ? goog.fx.Animation.EventType.BEGIN:
            goog.fx.Animation.EventType.END;
    goog.events.listen(anim, event, function(e) {
        if (clbk) clbk.call(that);
    });
    return this;
};

frame.dom.Node.prototype.alert = function(color, clbk, that) {
    color = frame.dom.fx.toRGB(color || '#ff0000');
    var oldColor = frame.dom.fx.toRGB(this.style('backgroundColor') || '#ffffff');
    this.toColor(color, 100, function(){
        this.toColor(oldColor, 100, function(){
            if (clbk) clbk.call(that);
        }, this)
    }, this)
    return this;
};
