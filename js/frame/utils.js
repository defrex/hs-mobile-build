
goog.provide('frame.utils');

/**
* formats a date
* @param {Date|number=} date Default to now.
* @return {string} Formatted date.
**/
frame.utils.formatDate = function(date) {
    var days = new Array('Sunday', 'Monday', 'Tuesday',
            'Wednesday', 'Thursday', 'Friday', 'Saturday');

    /*var months = new Array("January", "February", "March",
            "April", "May", "June", "July", "August", "September",
            "October", "November", "December");*/

    var monthsShort = new Array('Jan.', 'Feb.', 'March',
            'April', 'May', 'June', 'July', 'Aug.', 'Sept.',
            'Oct.', 'Nov.', 'Dec.');

    var ret, now = new Date();
    date = typeof date == 'number' ? new Date(date) :
           typeof date == 'undefined' ? new Date() :
           date;

    if (date.getFullYear() == now.getFullYear())
        if (date.getDate() - now.getDate() < 8)
            if (date.getDate() == now.getDate())
                ret = 'Today';
            else if (date.getDate() - now.getDate() == 1)
                ret = 'Tomorrow';
            else
                ret = days[date.getDay()];
        else
            ret = monthsShort[date.getMonth()] + ' ' + date.getDate();
    else
        ret = monthsShort[date.getMonth()] + ' ' + date.getDate() +
                ', ' + date.getFullYear();

    var hour = date.getHours();
    var m = 'am';
    if (hour - 12 > 0) {
        hour = hour - 12;
        m = 'pm';
    }
    ret += ' at ' + hour + ':' + date.getMinutes() + m;

    return ret;
};

