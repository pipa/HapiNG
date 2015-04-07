'use strict';

// Dependencies =================================
	var Joi 		= require('joi'),
		Boom 		= require('boom'),
		Contact 	= require('../model/contact'),
		User 		= require('../model/user');

// Routes Object ================================
	var api = {
		contact: {
			create: {
				validate: {
					payload: {
						name: Joi.string().required(),
						email: Joi.string().email().required(),
						message: Joi.string().required()
					}
				},
				handler: function(request, reply) {
					var contact = new Contact(request.payload);
					contact.save(function(err, contact) {
						if (!err) {
							reply(contact).created('/contact/' + contact._id); // HTTP 201
						} else {
							reply(Boom.forbidden(getErrorMessageFrom(err))); // HTTP 403
						}
					});
				}
			},
			read: {
				validate: {
					params: {
						contact_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/)
					}
				},
				handler: function(request, reply) {
					var c_id = request.params.contact_id ? encodeURIComponent(request.params.contact_id) : '',
						query = (c_id !== "")? { "_id": c_id }: {};

					Contact.find(query, function(err, contacts) {
						// Returns an  array
						if (!err) {
							var result = (contacts.length > 1 && contacts.length !== 0)? contacts: contacts[0];
							reply(result);
						} else {
							reply(Boom.badImplementation(err)); // 500 error
						}
					});
				}
			},
			update: {
				validate: {
					payload: {
						name: Joi.string().required(),
						email: Joi.string().email().required(),
						message: Joi.string().required()
					}
				},
				handler: function(request, reply) {
					Contact.findOne({ '_id': request.params.contact_id }, function(err, contact) {
						if (!err) {
							contact.name = request.payload.name;
							contact.email = request.payload.email;
							contact.message = request.payload.message;

							contact.save(function(err, contact) {
								if (!err) {
									reply(contact).created('/contact/' + contact._id); // HTTP 201
								} else {
									reply(Boom.forbidden(getErrorMessageFrom(err))); // HTTP 403
								}
							});
						} else {
							reply(Boom.badImplementation(err)); // 500 error
						}
					});
				}
			},
			delete: {
				validate: {
					params: {
						contact_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/)
					}
				},
				handler: function(request, reply) {
					Contact.findOne({
						'_id': request.params.contact_id
					}, function(err, contact) {
						if (!err && contact) {
							contact.remove();
							reply({
								message: "Contact deleted successfully"
							});
						} else if (!err) {
							// Couldn't find the object.
							reply(Boom.notFound());
						} else {
							reply(Boom.badRequest("Could not delete contact"));
						}
					});
				}
			}
		},

		user: {
			create: {
				validate: {
					payload: {
						username: Joi.string().required(),
						password: Joi.string().required(),
						email: Joi.string().email().required()
					}
				},
				handler: function(request, reply) {
					var user = new User(request.payload);
					user.save(function(err, user) {
						if (!err) {
							reply(user).created('/user/' + user._id); // HTTP 201
						} else {
							reply(Boom.forbidden(getErrorMessageFrom(err))); // HTTP 403
						}
					});
				}
			},
			read: {
				validate: {
					params: {
						contact_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/)
					}
				},
				handler: function(request, reply) {
					var c_id = request.params.contact_id ? encodeURIComponent(request.params.contact_id) : '',
						query = (c_id !== "")? { "_id": c_id }: {};

					Contact.find(query, function(err, contacts) {
						// Returns an  array
						if (!err) {
							var result = (contacts.length > 1)? contacts[0]:contacts;
							reply(result);
						} else {
							reply(Boom.badImplementation(err)); // 500 error
						}
					});
				}
			},
			update: {
				validate: {
					payload: {
						name: Joi.string().required(),
						email: Joi.string().email().required(),
						message: Joi.string().required()
					}
				},
				handler: function(request, reply) {
					Contact.findOne({ '_id': request.params.contact_id }, function(err, contact) {
						if (!err) {
							contact.name = request.payload.name;
							contact.email = request.payload.email;
							contact.message = request.payload.message;

							contact.save(function(err, contact) {
								if (!err) {
									reply(contact).created('/contact/' + contact._id); // HTTP 201
								} else {
									reply(Boom.forbidden(getErrorMessageFrom(err))); // HTTP 403
								}
							});
						} else {
							reply(Boom.badImplementation(err)); // 500 error
						}
					});
				}
			},
			delete: {
				validate: {
					params: {
						contact_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/)
					}
				},
				handler: function(request, reply) {
					Contact.findOne({
						'_id': request.params.contact_id
					}, function(err, contact) {
						if (!err && contact) {
							contact.remove();
							reply({
								message: "Contact deleted successfully"
							});
						} else if (!err) {
							// Couldn't find the object.
							reply(Boom.notFound());
						} else {
							reply(Boom.badRequest("Could not delete contact"));
						}
					});
				}
			}
		}
	};

// Exposing API Routes ========================
	module.exports = api;