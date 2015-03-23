'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * News Schema
 */
var NewsSchema = new Schema({
	title: {
		type: String,
		default: '',
		required: 'Please fill News title',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
    content: {
        type: String,
        default: '',
        required: 'Please provide the news content',
        trim: true
    }
});

mongoose.model('News', NewsSchema);
