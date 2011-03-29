
goog.provide('hs.users.views');

goog.require('hs.tmpl.users');
goog.require('frame.View');
goog.require('frame.dom.fx');
goog.require('frame.form.utils');
goog.require('frame.apiRequest');
goog.require('PhoneGap');

/** @constructor **/
hs.users.views.Login = function(){
    frame.View.call(this, Array.prototype.pop.call(arguments));
};
goog.inherits(hs.users.views.Login, frame.View);

/**
* only allow authed users to see this view
* @type {boolean}
**/
hs.users.views.Login.prototype.requireAuth = false;

/**
* display Action Bar
* @type {boolean}
**/
hs.users.views.Login.prototype.actionBar = false;

/**
* The view's template
* @type {function()}
**/
hs.users.views.Login.prototype.template = hs.tmpl.users.Login;

/**
* Set up event handlers after the DOM is loaded
* @type {function()}
**/
hs.users.views.Login.prototype.enterDocument = function(){
    frame.View.prototype.enterDocument.call(this, Array.prototype.pop.call(arguments));

    this.doc.q('#login form').on('submit', function(e){
        e.preventDefault();
        var email = this.doc.q('#email');
        if (!frame.form.utils.isValidEmail(email.val())){
            email.alert();
        }else{
            var email = email.val();
            frame.apiRequest({
                path: '/api/v1/user/',
                method: 'POST',
                body: {'email': email},
                auth: false
            }, function(resp, status, xhr){
                if (status == 201){
                    frame.store.put('email', email);
                    frame.store.put('user', xhr.getResponseHeader('Location'));
                    frame.store.put('token', resp.token || 'faketoken');
                    frame.controller.goTo('/');
                }else{
                    frame.warn('TODO: handle login');
                }
            }, this);
        }
    }, this);
};

/**
* Submit the form
* @type {function()}
**/
hs.users.views.Login.prototype.submit = function(){
    frame.log('Submitting');
};



/** @constructor **/
hs.users.views.Logout = function(){
    frame.View.call(this, Array.prototype.pop.call(arguments));

    frame.store.del('email');
    frame.controller.goTo('/');
};
goog.inherits(hs.users.views.Logout, frame.View);

hs.users.views.Logout.prototype.noDisplay = true;
