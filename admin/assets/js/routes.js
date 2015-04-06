'use strict';

// @ngInject ====================================
	function Routes($stateProvider, $locationProvider, $urlRouterProvider, $httpProvider, Config, USER_ROLES) {
		$stateProvider
			// Entry Point
			.state('main', {
				abstract: true,
				controller: 'main_ctrl'
			})
				// UnSecured
				.state('main.login', {
					url: '/',
					templateUrl: Config.tpl('index'),
					controller: 'login_ctrl',
					data: {
						authorizedRoles: [USER_ROLES.all]
					}
				})
				// Secured
				.state('logged',{
					abstract: true,
					data: {
						authorizedRoles: [USER_ROLES.admin]
					}
				})
					.state('dashboard',{
						url: '/dashboard',
						templateUrl: Config.tpl('dash')
					});

		$urlRouterProvider.otherwise('/');
		// $locationProvider.html5Mode({
		//  enabled: true,
		//  requireBase: false
		// });

		$httpProvider.interceptors.push([
			'$injector',
			function ($injector) {
				return $injector.get('AuthInterceptor');
			}
		]);
	}

module.exports = Routes;