'use strict';

// @ngInject ====================================
	function Routes($stateProvider, $locationProvider, $urlRouterProvider, $httpProvider, Config, USER_ROLES) {
		$stateProvider
			// UnSecured
			.state('login', {
				url: '/',
				templateUrl: Config.tpl('login'),
				controller: 'login_ctrl',
				data: {
					authorizedRoles: [USER_ROLES.all]
				}
			})
			// Secured
			.state('secure',{
				abstract: true,
				template: '<ui-view />',
				data: {
					authorizedRoles: [USER_ROLES.admin]
				}
			})
				.state('secure.dashboard',{
					url: '/dashboard',
					templateUrl: Config.tpl('dash')
				});

		$urlRouterProvider.otherwise('/');
		// $locationProvider.html5Mode({
		//  enabled: true,
		//  requireBase: false
		// });

		$httpProvider.interceptors.push(['$injector', function ($injector) {
			return $injector.get('AuthInterceptor');
		}]);
	}

module.exports = Routes;