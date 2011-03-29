
goog.provide('frame.View');

goog.require('goog.ui.Component');
goog.require('goog.ui.Component.Error');
goog.require('frame.store');
goog.require('frame.tmpl');

/**
* The main View object. Subclasses of View can be registered in urls.js to
* create a "page".
* @constructor
**/
frame.View = function() {
    goog.ui.Component.call(this, Array.prototype.pop.call(arguments));

    if (this.requireAuth
        && frame.controller.settings.isAuthenticated
        && !frame.controller.settings.isAuthenticated())
            throw ('403');

    this.args = Array.prototype.slice.call(arguments);

    this.doc = new frame.dom.Node(document, this.dom_);
};
goog.inherits(frame.View, goog.ui.Component);

/**
* only allow authed users to see this view
* @type {boolean}
**/
frame.View.prototype.requireAuth = true;

/**
* display Action Bar
* @type {boolean}
**/
frame.View.prototype.actionBar = true;

/**
* The view's template
* @type {function()}
**/
frame.View.prototype.template = null;

/**
* view has a display
* @type {boolean}
**/
frame.View.prototype.noDisplay = false;

/**
* define buttons.
* @type {Object.<string, Array.<string, function()>>}
**/
frame.View.prototype.abButtons = null;

/**
* @param {function(Object)} clbk required. called after render.
* @param {Object} that clbk's this.
**/
frame.View.prototype.createDom = function(clbk, that) {
    frame.View.superClass_.createDom.call(this);
    that = that || this;

    if (this.template === null) throw ('no template for view');

    if (!this.actionBar && this.doc.q('#actionbar').visible())
        this.doc.q('#actionbar').hide();
    else if (this.actionBar && !this.doc.q('#actionbar').visible())
        this.doc.q('#actionbar').show();

    if (this.abButtons != null)
        for (var i=0, len=this.abButtons.length; i<len; i++){
            var b = frame.tmpl.ActionBarButton(this.abButtons[i]);
            if (this.abButtons[i].position == 'right')
                this.doc.q('#actionbar').append(b);
            else if (this.abButtons[i].position == 'left')
                this.doc.q('#actionbar').prepend(b);
            else
                throw('invalid action bar button position: '+this.abButtons[i].position);
        }


    this.prepContext(function() {
        this.element_.innerHTML = this.template(this);
        clbk.call(that);
    }, this);
};

/**
* @param {function(Object)} clbk required. called after render.
* @param {Object} that clbk's this.
**/
frame.View.prototype.exitDocument = function(clbk, that) {
    this.doc.q('.ab-button').remove();
};

/**
* async-able verstion of goog.ui.Component.prototype.render_
* @param {Element} opt_parent the parent element to render into.
* @param {function(Object)} clbk required. called after render.
* @param {Object} that clbk's this.
**/
frame.View.prototype.render = function(opt_parent, clbk, that) {
    if (this.inDocument_)
        throw Error(goog.ui.Component.Error.ALREADY_RENDERED);

    if (typeof opt_parent == 'function') {
        clbk = opt_parent;
        that = clbk || this;
    }else {
        that = that || this;
    }

    if (!this.element_) this.createDom(withDom, this);
    else withDom.call(this);

    function withDom() {
        if (opt_parent) {
            opt_parent.appendChild(this.element_);
        } else {
            this.dom_.getDocument().body.appendChild(this.element_);
        }

        // If this component has a parent component that isn't in the document yet,
        // we don't call enterDocument() here.  Instead, when the parent component
        // enters the document, the enterDocument() call will propagate to its
        // children, including this one.  If the component doesn't have a parent
        // or if the parent is already in the document, we call enterDocument().
        if (!this.parent_ || this.parent_.isInDocument()) {
            this.enterDocument();
        }
        if (clbk) clbk.call(that);
    }
};

/**
* Override to setup before template rendering.
* @param {function(Object)} clbk required. called after render.
* @param {Object} that clbk's this.
**/
frame.View.prototype.prepContext = function(clbk, that) {
    if (clbk) clbk.call(that || this);
};

/**
* Set up the placeholder text
* @type {function()}
**/
frame.View.prototype.placehold = function(){
    this.doc.q('[placeholder]').each(function(elem){
        elem = new frame.dom.Node(elem);
        elem.val(elem.attr('placeholder'));
        elem.addClass('placeheld');
    });
    this.doc.q('[placeholder]').on('focus', function(e){
        elem = new frame.dom.Node(e.target);
        if (elem.val() == elem.attr('placeholder')){
            elem.val('');
            elem.removeClass('placeheld');
        }
    }, this);
    this.doc.q('[placeholder]').on('blur', function(e){
        elem = new frame.dom.Node(e.target);
        if (elem.val() == ''){
            elem.val(elem.attr('placeholder'));
            elem.addClass('placeheld');
        }
    }, this);
};
