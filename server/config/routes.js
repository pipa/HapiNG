'use strict';

// Local vars & deps ============================
	var requireDirectory 	= require('require-directory'),
		routes;

// Routes handling ==============================
	routes = function(server) {
		var controller = requireDirectory(module, server.settings.app.root+'/server/controllers'), // Bootstrap your controllers so you dont have to load them individually.
			api = controller.api,
			routes_table;

		routes_table = [
			// API
			{ method: 'POST', 	path: '/api/contact', 				config: api.contact.create },
			{ method: 'GET', 	path: '/api/contact', 				config: api.contact.read },
			{ method: 'GET', 	path: '/api/contact/{contact_id}', 	config: api.contact.read },
			{ method: 'PUT', 	path: '/api/contact/{contact_id}', 	config: api.contact.update },
			{ method: 'DELETE', path: '/api/contact/{contact_id}', 	config: api.contact.delete },

			// Admin
			{ method: 'GET', path: '/admin', handler: function (request, reply) { return reply('ok'); } },
			{ method: 'GET', path: '/admin/css/{path*}', handler: { directory: { path: './css' } } },
			{ method: 'GET', path: '/admin/img/{path*}', handler: { directory: { path: './img' } } },
			{ method: 'GET', path: '/admin/js/{path*}', handler: { directory: { path: './js' } } },

			// Public
			{ method: 'GET', path: '/', handler: function (request, reply) { return reply('ok'); } }
		];

		server.route(routes_table);
	};

// Export Routes ================================
	module.exports = routes;