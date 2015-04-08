'use strict';

// Dependencies =================================
	var Joi 		= require('joi'),
		Boom 		= require('boom'),
		config 		= require('../config'),
		User 		= require('../model/user');

// Routes Object ================================
	var admin_opts = { path: config.root + '/admin/views', layout: config.root + '/admin/views/layouts/default' },
		admin = {
			index: {
				handler: function (request, reply) {
					console.log(request.session);
					var conf = {
						env: config.env.name
					};
					return reply.view('index', conf, admin_opts);
				}
			},
			login: {
				validate: {
					payload: {
						username: Joi.string().required(),
						password: Joi.string().required()
					}
				},
				handler: function (request, reply) {
					User.findOne({ username: request.payload.username }, function(err, user) {
						if (err) {
							throw err;
							return reply(Boom.forbidden(getErrorMessageFrom(err))); // HTTP 403
						}

						// test a matching password
						user.comparePassword(request.payload.password, function(err, isMatch) {
							if (err) throw err;

							request.session.set(request.session.id, {user: user});
							if (isMatch) return reply({
								session_id: request.session.id,
								user: user
							});
							else return reply(Boom.unauthorized('invalid password'));
						});
					});
				}
			}
		};

// Exposing API Routes ========================
	module.exports = admin;