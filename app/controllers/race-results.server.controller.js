'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	RaceResult = mongoose.model('RaceResult'),
	_ = require('lodash');

/**
 * Create a Race result
 */
exports.create = function(req, res) {
	var raceResult = new RaceResult(req.body);
	raceResult.user = req.user;

	raceResult.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(raceResult);
		}
	});
};

/**
 * Show the current Race result
 */
exports.read = function(req, res) {
	res.jsonp(req.raceResult);
};

/**
 * Update a Race result
 */
exports.update = function(req, res) {
	var raceResult = req.raceResult ;

	raceResult = _.extend(raceResult , req.body);

	raceResult.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(raceResult);
		}
	});
};

/**
 * Delete an Race result
 */
exports.delete = function(req, res) {
	var raceResult = req.raceResult ;

	raceResult.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(raceResult);
		}
	});
};

/**
 * List of Race results
 */
exports.list = function(req, res) { 
	RaceResult.find().sort('-created').populate('user', 'displayName').exec(function(err, raceResults) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(raceResults);
		}
	});
};

/**
 * Race result middleware
 */
exports.raceResultByID = function(req, res, next, id) { 
	RaceResult.findById(id).populate('user', 'displayName').exec(function(err, raceResult) {
		if (err) return next(err);
		if (! raceResult) return next(new Error('Failed to load Race result ' + id));
		req.raceResult = raceResult ;
		next();
	});
};

/**
 * Race result authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.raceResult.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
