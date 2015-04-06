"use strict";

// @ngInject ====================================
	function on_run($rootScope, Config, AUTH_EVENTS, AuthFactory) {
		$rootScope.app_name = Config.app_name;
		$rootScope.title = Config.app_name;

		// Application Vars
		$rootScope.le_app = window.le_app;

		$rootScope.$on('$stateChangeStart', function (event, next) {
			var authorizedRoles = next.data.authorizedRoles;

			if (authorizedRoles.indexOf('*') !== -1) return true; // anyone can access it
			console.log(authorizedRoles);
			console.log(!AuthFactory.isAuthorized(authorizedRoles));
			if (!AuthFactory.isAuthorized(authorizedRoles)) {
				event.preventDefault();
				if (AuthFactory.isAuthenticated()) {
					// user is not allowed
					$rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
				} else {
					// user is not logged in
					$rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
				}
			}
		});
	}

module.exports = on_run;