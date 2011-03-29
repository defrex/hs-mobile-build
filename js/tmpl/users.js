// This file was automatically generated from users.soy.
// Please don't edit this file by hand.

goog.provide('hs.tmpl.users');

goog.require('soy');
goog.require('soy.StringBuilder');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
hs.tmpl.users.Login = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id="login"><img src="img/auth_logo.png" /><form><input type="email" required placeholder="Email" id="email" /><input type="submit" value="Start Posting" /></form></div>');
  if (!opt_sb) return output.toString();
};
