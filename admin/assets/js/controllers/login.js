"use strict";

// Dependencies =================================

// Controller Function ==========================
	var login_ctrl = function ($scope) {
		$scope.credentials = {
			username: '',
			password: ''
		};
		console.log($scope.userRoles);
		$scope.login = function() {

		};
	};

// @ngInject ====================================
	app.controller('login_ctrl', login_ctrl);


