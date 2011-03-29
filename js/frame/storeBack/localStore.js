
goog.provide('frame.storeBack.LocalStore');

goog.require('frame.storeBack');

/** @constructor **/
frame.storeBack.LocalStore = function(){
    frame.storeBack.call(this);
};
goog.inherits(frame.storeBack.LocalStore, frame.storeBack);

frame.storeBack.LocalStore.prototype.has = function(key) {
    return this.get(key) != null;
};
frame.storeBack.LocalStore.prototype.get = function(key) {
    return window.localStorage.getItem(key);
};
frame.storeBack.LocalStore.prototype.put = function(key, value) {
    window.localStorage.setItem(key, value);
};
frame.storeBack.LocalStore.prototype.del = function(key) {
    window.localStorage.removeItem(key);
};
frame.storeBack.LocalStore.prototype.clear = function() {
    window.localStorage.clear();
};

frame.storeBack.LocalStore.isAvailable = function() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    }catch (e) {
        return false;
    }
};

