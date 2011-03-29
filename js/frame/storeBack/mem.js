
goog.provide('frame.storeBack.Mem');

goog.require('frame.storeBack');

/** @constructor **/
frame.storeBack.Mem = function() {
    frame.storeBack.call(this);
    this.cache = new Object();
};
goog.inherits(frame.storeBack.Mem, frame.storeBack);

frame.storeBack.Mem.prototype.get = function(key) {
    return this.cache[key];
};
frame.storeBack.Mem.prototype.put = function(key, value) {
    this.cache[key] = value;
};
frame.storeBack.Mem.prototype.has = function(key) {
    return typeof this.cache[key] != 'undefined';
};
frame.storeBack.Mem.prototype.del = function(key) {
    delete this.cache[key];
};
frame.storeBack.Mem.prototype.clear = function() {
    this.cache = new Object();
};

frame.storeBack.Mem.isAvailable = function() {return true;};

