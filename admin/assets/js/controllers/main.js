"use strict";

// Dependencies =================================

// Controller Function ==========================
	var main_ctrl = function ($scope, USER_ROLES, AuthFactory) {
		$scope.currentUser = null;
		$scope.userRoles = USER_ROLES;
		$scope.isAuthorized = AuthFactory.isAuthorized;

		$scope.setCurrentUser = function (user) {
			$scope.currentUser = user;
		};
	};

// @ngInject ====================================
	app.controller('main_ctrl', main_ctrl);