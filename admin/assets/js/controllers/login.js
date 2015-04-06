"use strict";

// Dependencies =================================

// Controller Function ==========================
	var login_ctrl = function ($scope, $rootScope, $state, AuthFactory, AUTH_EVENTS) {
		$scope.credentials = {
			username: '',
			password: ''
		};

		$scope.login = function(credentials) {
			AuthFactory
				.login(credentials)
				.then(function (user) {
					$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
					$scope.setCurrentUser(user);
					$state.go('logged.dashboard');
				}, function () {
					$rootScope.$broadcast(AUTH_EVENTS.loginFailed);
				});
		};
	};

// @ngInject ====================================
	app.controller('login_ctrl', login_ctrl);


