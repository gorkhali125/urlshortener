'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UrlShortenSchema = new Schema({
	originalUrl: {
		type: String,
		required: true
	},
	urlHash: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('Url', UrlShortenSchema);