
goog.provide('frame.Controller');
goog.provide('frame.start');

goog.require('goog.dom');
goog.require('goog.testing.stacktrace');
goog.require('frame.route');
goog.require('frame.init');
goog.require('frame.dom.Node');
goog.require('frame.tmpl');
goog.require('frame');

/**
* One Class to rule them all. Or at lease rule all the Views.
* @constructor
**/
frame.Controller = function(settings) {
    /**
    * @type {Object}
    **/
    this.settings = settings;

    /**
    * @type {Array.<frame.View>}
    **/
    this.viewStack = new Array();

    /**
    * DOM helper class. This get passed into and reused by all the views.
    * @type {goog.dom.DomHelper}
    **/
    this.dom_ = goog.dom.getDomHelper();

    /**
    * DOMinator.
    * @type {frame.dom.Node}
    **/
    this.doc = new frame.dom.Node(document, this.dom_);

    this.doc.q('body').append(frame.tmpl.Main());

    if (frame.PLATFORM == 'ios') frame.init(function(){
        this.doc.q('#actionbar').style('position', 'absolute');
        var that = this;
        (function moveAB(){
            that.doc.q('#actionbar').style('top', window.pageYOffset+'px');
            setTimeout(moveAB, 100);
        })();
    }, this);
};

/** Kicks off the hash change monitoring. **/
frame.Controller.prototype.startHashChange = function() {
    var that = this;
    var hashChange = function() {
        var h = window.location.hash;
        h = h == '' ? '/' : h.slice(1);
        frame.info('hashchange: '+h);
        frame.route(h, null, that.settings.urls);
    }

    if (window.onHashChange != undefined) {
        window.onHashChange = hashChange;
    }else {
        var hash;
        (function checkHash() {
            if (hash != window.location.hash) {
                hash = window.location.hash;
                hashChange();
            }
            setTimeout(checkHash, 100);
        })();
    }
};

/** Render the top view **/
frame.Controller.prototype.renderTop = function() {
    this.viewStack[this.viewStack.length - 1].render(this.doc.q('#main').html('')[0]);
};

/**
* @param {frame.View} view View subclass.
* @param {Array.<string>} args extracted data from catpture groups in the url.
**/
frame.Controller.prototype.push = function(view, args) {
    if (!(view instanceof frame.View)) {
        if (!(args[args.length-1] instanceof goog.dom.DomHelper))
            args.push(this.dom_);
        // this little hack-fest here lets us instantiate the view with apply
        var V = function() {view.apply(this, args)};
        V.prototype = view.prototype;
        try {
            view = new V();
        }catch (e) {
            if (e == '403') this.authReset();
            else if (frame.DEBUG)
                frame.log('view init error: '+e, view);
            return;
        }
    }
    this.viewStack.push(view);
    if (view.noDisplay !== true) this.renderTop();
};

/** Remove view from stack **/
frame.Controller.prototype.pop = function() {
    this.viewStack.pop().dispose();
    this.renderTop();
};

/** clear view stack **/
frame.Controller.prototype.clear = function() {
    this.viewStack = new Array();
};

/**
* fetch a URL, kinda
* @param {string} path Path to go to.
**/
frame.Controller.prototype.goTo = function(path) {
    document.location.hash = '#' + path;
};

/**
* Triggers when there is an auth error. It clears the view stack
*  and loads /login/
**/
frame.Controller.prototype.authReset = function() {
    if (this.settings.on403)
        this.settings.on403.call(this);
    else throw('403');
};

/**
* resizes the wrapper div. Needed for iScroll.
**/
frame.Controller.prototype.setWrapperHeight = function(){
    var abHeight = this.doc.q('#actionbar')[0].offsetHeight,
        wrapperHeight = window.innerHeight - abHeight;
    this.doc.q('#wrapper').style('height', wrapperHeight+'px');
};


frame.start = function(settings, clbk, that) {
    frame.init(function(){
        frame.controller = new frame.Controller(settings);
        frame.controller.startHashChange();
        if (clbk) clbk.call(that);
    });
};
