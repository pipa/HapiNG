'use strict';

// @ngInject ====================================
	function Routes($stateProvider, $locationProvider, $urlRouterProvider, $httpProvider, Config, USER_ROLES) {
		$stateProvider
			.state('main',{
				abstract: true,
				url: '/admin',
				template: '<ui-view />'
			})
				// UnSecured
				.state('main.login', {
					url: '/',
					templateUrl: Config.tpl('login'),
					controller: 'login_ctrl',
					data: {
						authorizedRoles: [USER_ROLES.all]
					}
				})
				// Secured
				.state('main.secure',{
					abstract: true,
					template: '<ui-view />',
					controller: 'main_ctrl',
					data: {
						authorizedRoles: [USER_ROLES.admin]
					}
				})
					.state('main.secure.dashboard',{
						url: '/dashboard',
						templateUrl: Config.tpl('dash')
					})
					.state('main.secure.contacts',{
						url: '/contacts',
						templateUrl: Config.tpl('contacts/index'),
						controller: 'contacts_ctrl'
					})
						.state('main.secure.contacts.edit',{
							url: '/edit/:contact_id',
							templateUrl: Config.tpl('contacts/edit')
						});

		$urlRouterProvider.otherwise('/');
		$locationProvider.html5Mode({
			enabled: true,
			requireBase: false
		});

		$httpProvider.interceptors.push(['$injector', function ($injector) {
			return $injector.get('AuthInterceptor');
		}]);
	}

module.exports = Routes;