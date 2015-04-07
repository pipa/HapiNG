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

			{ method: 'POST', 	path: '/api/user', 					config: api.user.create },
			{ method: 'GET', 	path: '/api/user', 					config: api.user.read },
			{ method: 'GET', 	path: '/api/user/{user_id}', 		config: api.user.read },
			{ method: 'PUT', 	path: '/api/user/{user_id}', 		config: api.user.update },
			{ method: 'DELETE', path: '/api/user/{user_id}', 		config: api.user.delete },

			// Admin
			{ method: 'GET', 	path: '/admin/',					config: controller.admin.index },
			{ method: 'POST', 	path: '/login/',					config: controller.admin.login },
			{ method: 'GET', 	path: '/admin/css/{path*}', 		handler: { directory: { path: './css' } } },
			{ method: 'GET', 	path: '/admin/img/{path*}', 		handler: { directory: { path: './img' } } },
			{ method: 'GET', 	path: '/admin/js/{path*}', 			handler: { directory: { path: './js' } } },
			{ method: 'GET', 	path: '/admin/views/{path*}', 		handler: { directory: { path: './views' } } },
			{ method: 'GET', 	path: '/admin/*',					config: controller.admin.index },

			// Public
			{ method: 'GET', path: '/', handler: function (request, reply) { return reply('ok'); } }
		];

		server.route(routes_table);
	};

// Export Routes ================================
	module.exports = routes;