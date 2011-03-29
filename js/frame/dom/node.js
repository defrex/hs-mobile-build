
goog.provide('frame.dom.Node');

goog.require('frame.dom.FastClick');
goog.require('frame.ArrayClass');
goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('goog.events');

/**
* The DOMinator. generally this will be created via doc.q. It holds the keys to
*  consise DOM manipulation.
* @constructor
* @param {Array.Object|Object} nds This should be one or more DOM nodes.
**/
frame.dom.Node = function(nds, opt_domHelper) {
    frame.ArrayClass.call(this);
    this.dom_ = opt_domHelper || goog.dom.getDomHelper();

    if (nds !== null && typeof nds != 'undefined'
            && typeof nds.length == 'undefined') {
        this.push(nds);
    }else if (nds !== null && typeof nds != 'undefined' && nds.length > 0) {
        for (var i = 0; i < nds.length; i++)
            this.push(nds[i]);
    }else {
        this.push(1);
        this.pop();
    }
};
goog.inherits(frame.dom.Node, frame.ArrayClass);

/**
* loop over the set, calling the function on each
* @param {function(Object)} fn passes in the node.
* @param {function()} clbk called when all iterations are complete.
* @param {Object} that context for the callbacks.
**/
frame.dom.Node.prototype.each = function(fn, clbk, that) {
    that = typeof clbk == 'object' ? clbk : that || this;
    for (var i=0, len=this.length; i<len; i++)
        fn.call(that, this[i], i);
    if (clbk) clbk.call(that);
    return this;
};

frame.dom.Node.prototype.q = function(q) {
    if (/^#\w+$/.test(q)) {
        return new frame.dom.Node(this[0].getElementById(q.slice(1)), this.dom_);
    }else if (/^\w+$/.test(q)) {
        return new frame.dom.Node(this[0].getElementsByTagName(q), this.dom_);
    }else {
        return new frame.dom.Node(this[0].querySelectorAll(q), this.dom_);
    }
};

frame.dom.Node.prototype.on = function(type, fn, that) {
    this.each(function(n) {
        if (type != 'click'){
            goog.events.listen(n, type, fn, false, that || n);
        }else{
            frame.dom.addFastClick(n, fn, that || n);
        }
    });
    return this;

};

frame.dom.Node.prototype.un = function(type, fn) {
    this.each(function(n) {
        goog.events.unlisten(n, type, fn, false);
    });
    return this;
};

frame.dom.Node.prototype.html = function(html) {
    if (typeof html == 'undefined')
        return this[0].innerHTML;
    this.each(function(n) {n.innerHTML = html});
    return this;
};

frame.dom.Node.prototype.append = function(html) {
    if (typeof html == 'undefined') throw ('html required');
    this.each(function(n) {n.innerHTML = n.innerHTML + html});
    return this;
};

frame.dom.Node.prototype.prepend = function(html) {
    if (typeof html == 'undefined') throw ('html required');
    this.each(function(n) {n.innerHTML = html + n.innerHTML});
    return this;
};

frame.dom.Node.prototype.before = function(html, clbk, that) {
    if (typeof html == 'function') {
        that = clbk || this;
        clbk = html;
        html = undefined;
    }
    if (typeof html == 'undefined') throw ('html required');
    this.each(function(n) {
        goog.dom.insertSiblingBefore(
                goog.dom.htmlToDocumentFragment(html), n);
    }, clbk, that);
    return this;
};

frame.dom.Node.prototype.hide = function() {
    this.each(function(n) {
        n.oldDisplay = n.style.display;
        n.style.display = 'none';
    });
    return this;
};

frame.dom.Node.prototype.show = function() {
    this.each(function(n) {
        n.style.display = n.oldDisplay || 'block';
    });
};

frame.dom.Node.prototype.visible = function() {
    var v = true;
    this.each(function(n) {
        v = v && n.style.display != 'none';
    });
    return v;
};

frame.dom.Node.prototype.remove = function() {
    this.each(function(n) {
        n.parentNode.removeChild(n);
    });
    return this;
};

frame.dom.Node.prototype.style = function(prop, val) {
    if (typeof val == 'undefined')
        return this[0].style[prop] = val;
    else {
        this.each(function(n) {
            n.style[prop] = val;
        });
        return this;
    }
};

frame.dom.Node.prototype.val = function(val) {
    if (typeof val == 'undefined')
        return this[0].value;
    else {
        this.each(function(n) {
            n.value = val;
        });
        return this;
    }
};

frame.dom.Node.prototype.attr = function(attr, val) {
    if (typeof val == 'undefined')
        return this[0].getAttribute(attr);
    else {
        this.each(function(n) {
            n.setAttribute(attr, val);
        });
        return this;
    }
};

frame.dom.Node.prototype.addClass = function(cls) {
    this.each(function(n) {
        goog.dom.classes.add(n, cls);
    });
    return this;
};

frame.dom.Node.prototype.removeClass = function(cls) {
    this.each(function(n) {
        goog.dom.classes.remove(n, cls);
    });
    return this;
};

