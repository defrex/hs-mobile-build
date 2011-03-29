
goog.provide('frame.Form');

goog.require('frame.dom.Node');
goog.require('frame.form.fields.Field');
goog.require('goog.object');

/**
* base Form class. extend this for new forms
* @constructor
**/
frame.Form = function(elem) {
    /**
    * DOMinator.
    * @type {frame.dom.Node}
    **/
    this.doc = new frame.dom.Node(document);

    this.elem = elem instanceof frame.dom.Node ? elem :
           typeof elem == 'string' ? this.doc.q(elem) :
           typeof this.q == 'string' ? this.doc.q(this.q) :
           null;
    if (this.elem == null) throw ('Form has no form query');
};

/**
* Validate the form
**/
frame.Form.prototype.validate = function(clbk, that) {
    that = that || this;
    this.errors = {};
    this.valid = true;
    var num = goog.object.getCount(this.fields);
    goog.object.forEach(this.fields, function(field, field_name) {
        field.validate(function(valid, error) {
            this.valid = this.valid && valid;
            if (!valid) this.errors[field_name] = error;
            num--; if (num == 0)
                clbk.call(that, this.valid === true, this.errors);
        }, this);
    }, this);
};

/**
* Display form errors
**/
frame.Form.prototype.displayErrors = function(clbk, that) {
    that = that || this;
    var num = goog.object.getCount(this.fields);
    goog.object.forEach(this.fields, function(field, field_name) {
        field.displayError(this.renderError, function() {
            num--; if (num == 0 && clbk) clbk.call(that);
        }, this);
    }, this);
};

frame.Form.prototype.renderError = function(elem, error, clbk, that) {
    that = that || this;
    elem.before(error, clbk, that);
};

