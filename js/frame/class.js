
goog.provide('frame.ArrayClass');

goog.require('frame.log');

/**
* Inherit from this to make an array-like object
* @constructor
**/
frame.ArrayClass = function() {};
frame.ArrayClass.prototype = new Array();

