'use strict';

// Dependencies =================================
	var requireDirectory = require('require-directory');

// Exporting Module =============================
	module.exports = function(server) {
		var plugs 	= requireDirectory(module,server.settings.app.root+'/server/plugins');
		for (var key in plugs) {
			if (typeof plugs[key] === 'function') {
				plugs[key](server);
			}
		}
	};