'use strict';

// @ngInject ====================================
	function Routes($stateProvider, $locationProvider, $urlRouterProvider, Config) {
		$stateProvider
			// Entry Point
			.state('splash', {
				url: '/',
				templateUrl: Config.tpl('splash')
			})
			// Secured
			;

		$urlRouterProvider.otherwise('/');
		// $locationProvider.html5Mode({
		//  enabled: true,
		//  requireBase: false
		// });
	}

module.exports = Routes;