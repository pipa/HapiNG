"use strict";

// Dependencies =================================

// Controller Function ==========================
	var login_ctrl = function ($scope, $rootScope, $state, AuthFactory, AUTH_EVENTS, $location) {
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
					$location.path('/admin/dashboard');
					// $state.go('main.secure.dashboard');
				}, function () {
					$rootScope.$broadcast(AUTH_EVENTS.loginFailed);
				});
		};
	};

// @ngInject ====================================
	app.controller('login_ctrl', login_ctrl);


