
goog.provide('hs.listings.models');

goog.require('frame.Model');

hs.listings.models.Listing = function(){
    frame.Model.apply(this, arguments);
};
goog.inherits(hs.listings.models.Listing, frame.Model);

/*
* @type {String}
*/
hs.listings.models.Listing.prototype.fields = {
    description: null,
    price: null,
    user: null,
    latitude: null,
    longtitude: null,
    photo: null
}

/*
* @type {String}
*/
hs.listings.models.Listing.prototype.resourcePath = '/api/v1/listing/';

frame.Model.create(hs.listings.models.Listing);
