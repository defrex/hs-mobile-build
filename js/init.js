
goog.provide('hs.init');

goog.require('frame.start');
goog.require('hs.urls');

setTimeout(function(){
    frame.start({
        urls: hs.urls,
        apiServer: '127.0.0.1:8000',
        on403: function(){
            this.clear();
            this.goTo('/login/');
        },
        isAuthenticated: function(){
            if (!frame.store.has('email'))
                return false;
            else
                return true;
        }
    });
}, 0);

frame.init(function(){window.top.scrollTo(0, 1);});

