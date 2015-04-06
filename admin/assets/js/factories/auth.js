'use strict';

// Dependencies =================================
	var angular = require('angular');

// Factory ======================================
	var AuthFactory = function($http, Session) {
		var factory = {
			login: function (credentials) {
				return $http
					.post('/login/', credentials)
					.then(function (res) {
						Session.create('1', res.data._id, res.data.role, res.data.email);
						return res.data;
					});
			},
			isAuthenticated: function () {
				return !!Session.user_id;
			},
			isAuthorized: function (authorizedRoles) {
				if (!angular.isArray(authorizedRoles)) {
					authorizedRoles = [authorizedRoles];
				}
				return (factory.isAuthenticated() && authorizedRoles.indexOf(Session.user_role) !== -1);
			}
		};

		return factory;
	};

// @ngInject ====================================
	app.factory('AuthFactory', AuthFactory);