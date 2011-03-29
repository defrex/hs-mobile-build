
goog.provide('frame.store');

goog.require('frame.storeBack.LocalStore');
goog.require('frame.storeBack.Mem');

frame.store = (function() {
    /** prioritised list of backends **/
    var backends = [
        [frame.storeBack.LocalStore.isAvailable, frame.storeBack.LocalStore],
        [frame.storeBack.Mem, frame.storeBack.Mem]
    ];

    // frame.log('backends', backends);
    // frame.log(frame.storeBack.LocalStore === backends[0]);
    // frame.log(frame.storeBack.LocalStore.isAvailable === backends[0].isAvailable);
    // frame.log('namespace:', frame.storeBack.LocalStore.isAvailable);
    // frame.log('array:', backends[0].isAvailable);

    for (var i=0, len=backends.length; i<len; i++)
        if (backends[i][0]())
            return new backends[i][1]();

    throw('no suitable storage backend');
})();

