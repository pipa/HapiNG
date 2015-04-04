'use strict';

// Local Vars ===================================
	var Mongoose 	= require('mongoose'),
		Schema 		= Mongoose.Schema;

// Contact Schema ===============================
	var Contact_Schema = Schema({
			name: { type: String, required: true },
			email: { type: String, required: true },
			message: { type: String, required: true }
		}),
		contact = Mongoose.model('contact', Contact_Schema);

// Schema export ================================
	module.exports = contact