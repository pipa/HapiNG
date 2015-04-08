"use strict";

// Dependencies =================================

// Controller Function ==========================
	var main_ctrl = function ($rootScope, $scope, $location, $cookieStore) {
		$scope.logout = function() {
			$rootScope.setCurrentUser(null);
			$cookieStore.remove('app_session');
			$location.path('/admin/');
		};
	};

// @ngInject ====================================
	app.controller('main_ctrl', main_ctrl);