'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Race result Schema
 */
var RaceResultSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Race result name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('RaceResult', RaceResultSchema);