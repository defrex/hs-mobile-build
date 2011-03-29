
goog.provide('hs.urls');

goog.require('hs.listings.views')
goog.require('hs.users.views')

/**
* urls for routing to View objects
* @type {Array.<Array.<String, frame.View>>}
**/
hs.urls = [
    ['^/$', hs.listings.views.Add],
    ['^/thanks/$', hs.listings.views.Thanks],
    ['^/login/$', hs.users.views.Login],
    ['^/logout/$', hs.users.views.Logout]
];
