'use strict';

// Dependencies =================================
	var angular = require('angular');

// Factory ======================================
	var AuthFactory = function($http, Session) {
		var factory = {
			login: function (credentials) {
				return $http
					.post('/login', credentials)
					.then(function (res) {
						Session.create(res.data.id, res.data.user.id,res.data.user.role);
						return res.data.user;
					});
			},
			isAuthenticated: function () {
				return !!Session.userId;
			},
			isAuthorized: function (authorizedRoles) {
				if (!angular.isArray(authorizedRoles)) {
					authorizedRoles = [authorizedRoles];
				}
				return (factory.isAuthenticated() && authorizedRoles.indexOf(Session.userRole) !== -1);
			}
		};

		return factory;
	};

// @ngInject ====================================
	app.factory('AuthFactory', AuthFactory);