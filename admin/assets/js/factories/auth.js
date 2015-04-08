'use strict';

// Dependencies =================================
	var angular = require('angular');

// Factory ======================================
	var AuthFactory = function($http, $cookieStore, Session) {
		var factory = {
			login: function (credentials) {
				return $http
					.post('/login/', credentials)
					.then(function (res) {
						var user = res.data.user;
						user.id = res.data.session_id;
						$cookieStore.put('app_session', user.id);
						new Session.create(user.id, user._id, user.role, user.email);
						return user;
					});
			},
			isAuthenticated: function () {
				return !!Session.id;
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