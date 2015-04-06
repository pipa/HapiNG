// Dependencies =================================
	var path = require('path'),
		rootPath = path.normalize(__dirname + '/../..');

// Exposing Settings ============================
	module.exports = {
		root: rootPath,
		port: parseInt(process.env.PORT, 10) || 3000,
		env: require('./env.json')[process.env.NODE_ENV || 'development']
	}