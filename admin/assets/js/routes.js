'use strict';

// @ngInject ====================================
	function Routes($stateProvider, $locationProvider, $urlRouterProvider, Config) {
		$stateProvider
			// Entry Point
			.state('index', {
				url: '/',
				templateUrl: Config.tpl('index')
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