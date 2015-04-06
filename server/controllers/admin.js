'use strict';

// Dependencies =================================
	var Joi 		= require('joi'),
		Boom 		= require('boom'),
		config 		= require('../config');

// Routes Object ================================
	var admin_opts = { path: config.root + '/admin/views', layout: config.root + '/admin/views/layouts/default' },
		admin = {
			index: {
				handler: function (request, reply) {
					var conf = {
						env: config.env.name
					};
					return reply.view('index', conf, admin_opts);
				}
			}
		};

// Exposing API Routes ========================
	module.exports = admin;