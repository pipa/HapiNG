'use strict';

// Local Vars ===================================
	let Mongoose 	= require('mongoose'),
		config 		= require('./config/');

// Connection ===================================
	Mongoose.connect('mongodb://'+config.env.db.host+':'+config.env.db.port+'/'+config.env.db.dsn);
	var db = Mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error'));
	db.once('open', function callback() {
		console.log("Connection with database succeeded.");
	});

// Mongoose export ==============================
	module.exports = {
		Mongoose: Mongoose,
		db: db
	}