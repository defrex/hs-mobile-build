// This file was automatically generated from main.soy.
// Please don't edit this file by hand.

goog.provide('frame.tmpl');

goog.require('soy');
goog.require('soy.StringBuilder');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
frame.tmpl.ActionBar = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id="actionbar"><a href="#/"><img src="img/ab_logo.png" alt="Hipsell" id="ab_logo" /></a></div>');
  if (!opt_sb) return output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
frame.tmpl.ActionBarButton = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<a href="#" class="ab-button button ', soy.$$escapeHtml(opt_data.position), '" id="', soy.$$escapeHtml(opt_data.id), '">', soy.$$escapeHtml(opt_data.text), '</a>');
  if (!opt_sb) return output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
frame.tmpl.Main = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  frame.tmpl.ActionBar(opt_data, output);
  output.append('<div id="wrapper"><div id="scroller"><div id="main"></div></div></div>');
  if (!opt_sb) return output.toString();
};
