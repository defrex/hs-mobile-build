// This file was automatically generated from listings.soy.
// Please don't edit this file by hand.

goog.provide('hs.tmpl.listings');

goog.require('soy');
goog.require('soy.StringBuilder');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
hs.tmpl.listings.Add = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<form id="new_listing"><div class="form_item"><label for="take_image">Image:</label><img id="image" /><input type="button" id="take_image" value="Take" /></div><textarea class="form_item" id="description" rows="3" placeholder="Description:"></textarea><input class="form_item" type="text" id="price" placeholder="Price:" /></form>');
  if (!opt_sb) return output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
hs.tmpl.listings.Thanks = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('Thanks!');
  if (!opt_sb) return output.toString();
};
