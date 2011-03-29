
goog.provide('frame.Model');
goog.provide('frame.ModelList');

goog.require('frame.ArrayClass');
goog.require('frame.apiRequest');
goog.require('goog.object');

/**
* Base class for data Model objects
* @constructor
**/
frame.Model = function(data){
    this._fields = goog.object.clone(this.fields);
    if (data) for (var key in data) if (data.hasOwnProperty(key))
        this._fields[key] = data[key];
};

/**
* Sets up the static methods for a new model class.
**/
frame.Model.create = function(Model, ModelList){
    Model.List = ModelList || frame.ModelList;
    Model.get = function(kwargs, clbk, that){
        frame.warn('unimplimented: Model.get');
        if (clbk) clbk.call(that);
    };
};

frame.Model.prototype.unsaved = false;

/*
* @type {String}
*/
frame.Model.prototype.resourcePath = null;

frame.Model.prototype.save = function(clbk, that){
    frame.apiRequest({
        path: this.resourcePath,
        method: 'POST',
        body: this._fields,
        auth: false
    }, function(resp, status){
        if (status == 200){
            this.unsaved = false;
            if (clbk) clbk.call(that, this);
        }else{
            frame.warn('bad save:', status);
        }
    }, this);
    return this;
};

frame.Model.prototype.field = function(key, val){
    if (val == undefined) return this._fields[key];

    this.unsaved = true;
    this._fields[key] = val;
    return this;
};

/**
* Base class list for Models
* @constructor
* @param {array} arr a json-array.
**/
frame.ModelList = function(arr) {
    frame.ArrayClass.apply(this, arguments);
    if (typeof arr != 'undefined' && arr.length)
        for (var i = 0; i < arr.length; i++)
            this.push(arr[i]);
};
goog.inherits(frame.ModelList, frame.ArrayClass);

/**
* call clbk for each item in list
* @param {function(frame.Model)} clbk
* @param {function(Object)} that this in the callback.
**/
frame.ModelList.prototype.each = function(clbk, that) {
    that = that || this;
    for (var i=0, len=this.length; i<len; i++)
        clbk.call(that, this.getItem(i));
    return this;
};

/**
* get Model instance at index
* @param {number} index
**/
frame.ModelList.prototype.getItem = function(index) {
    return new this.Model(this[index]);
};

