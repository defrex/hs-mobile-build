
goog.provide('frame.route');

frame.route = function(url, passed_args, urls) {
    for (var i=0, len=urls.length; i<len; i++) {
        var reg = typeof urls[i][0] == 'string' ? new RegExp(urls[i][0]) : urls[i][0];
        var args = reg.exec(url);
        if (args !== null) {
            args.shift();
            if (typeof passed_args == 'array')
                args.concat(passed_args);
            frame.controller.push(urls[i][1], args);
            return true;
        }
    }
    frame.log('no view for url: '+url);
    return false;
};

frame.route.include = function(urls) {
    return function() {
        frame.route(this[0], Array.prototype.slice.call(arguments, 0), urls);
    };
};

