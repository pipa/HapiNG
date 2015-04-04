'use strict';

// Local vars & deps ============================
	var requireDirectory 	= require('require-directory'),
		routes;

// Routes handling ==============================
	routes = function(server) {
		// Bootstrap your controllers so you dont have to load them individually.
		var controller = requireDirectory(module, server.settings.app.root+'/server/controllers'),
			api = controller.api,
			routes_table;

		routes_table = [
			// API
			{ method: 'POST', path: '/api/contact', config: api.contact.create },
			{ method: 'GET', path: '/api/contact', config: api.contact.read },
			{ method: 'GET', path: '/api/contact/{contact_id}', config: api.contact.read },
			{ method: 'PUT', path: '/api/contact/{contact_id}', config: api.contact.update },
			{ method: 'DELETE', path: '/api/contact/{contact_id}', config: api.contact.delete }

			// Admin
			// Public
		];

		server.route(routes_table);
	};

// Export Routes ================================
	module.exports = routes;