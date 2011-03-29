
goog.provide('frame.form.fields.Field');

/**
* The base class for Form Fields
* @constructor
**/
frame.form.fields.Field = function(kwargs) {
    if (typeof kwargs == 'string')
        this.kwargs = {q: kwargs};
    this.kwargs = kwargs;

    /**
    * DOMinator.
    * @type {frame.dom.Node}
    **/
    this.doc = new frame.dom.Node(document);
};

/**
* get this field element
**/
frame.form.fields.Field.prototype.getElem = function() {
    if (!this.elem)
        this.elem = this.doc.q(this.kwargs.q);
    return this.elem;
};

/**
* validate this form field
* @param {function(boolean, string)} clbk callback, passed a success
*     boolean and an error message.
**/
frame.form.fields.Field.prototype.validate = function(clbk, that) {
    that = that || this;
    var field = this;
    function d(valid, error) {
        field.valid = valid || field.valid === true;
        field.error = error || field.error;
        clbk.call(that, field.valid, field.error);
    }
    if (this.getElem().length < 1)
        d(false, 'No element matching q');
    else if (typeof this.kwargs.validate == 'function')
        this.kwargs.validate.call(that, d);
    else
        d(true);
};

/**
* display the error message, in a default way
* @param {function(frame.dom.Node, string)} renderError
*         called with an error for display.
* @param {function()} clbk callback called when the operation is complete.
* @param {Object} that this for the callback.
**/
frame.form.fields.Field.prototype.displayError = function(renderError, clbk, that) {
    that = that || this;
    if (this.valid === false)
        renderError.call(that, this.getElem(), this.error, clbk, that);
    else if (clbk)
        clbk.call(that);
};

/**
* get the value of the field
**/
frame.form.fields.Field.prototype.val = function() {
    var val = this.getElem().val();
    if (val !== null && val != '')
        return val;
};

