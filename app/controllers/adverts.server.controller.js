'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Advert = mongoose.model('Advert'),
	_ = require('lodash');

/**
 * Create a Advert
 */
exports.create = function(req, res) {
	var advert = new Advert(req.body);
	advert.user = req.user;

	advert.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(advert);
		}
	});
};

/**
 * Show the current Advert
 */
exports.read = function(req, res) {
	res.jsonp(req.advert);
};

/**
 * Update a Advert
 */
exports.update = function(req, res) {
	var advert = req.advert ;

	advert = _.extend(advert , req.body);

	advert.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(advert);
		}
	});
};

/**
 * Delete an Advert
 */
exports.delete = function(req, res) {
	var advert = req.advert ;

	advert.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(advert);
		}
	});
};

/**
 * List of Adverts
 */
exports.list = function(req, res) { Advert.find().sort('-created').populate('user', 'displayName').exec(function(err, adverts) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(adverts);
		}
	});
};

/**
 * Advert middleware
 */
exports.advertByID = function(req, res, next, id) { Advert.findById(id).populate('user', 'displayName').exec(function(err, advert) {
		if (err) return next(err);
		if (! advert) return next(new Error('Failed to load Advert ' + id));
		req.advert = advert ;
		next();
	});
};

/**
 * Advert authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.advert.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};