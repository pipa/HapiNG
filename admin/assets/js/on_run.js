"use strict";

// @ngInject ====================================
	function on_run($rootScope, $state, $cookies, Config, Session, AUTH_EVENTS, USER_ROLES, AuthFactory) {
		$rootScope.app_name = Config.app_name;
		$rootScope.title = Config.app_name;

		// Session Management
		$rootScope.currentUser = null;
		$rootScope.userRoles = USER_ROLES;
		$rootScope.isAuthorized = AuthFactory.isAuthorized;

		$rootScope.setCurrentUser = function (user) {
			$rootScope.currentUser = user;
		};

		// Application Vars
		$rootScope.le_app = window.le_app;

		$rootScope.$on('$stateChangeStart', function (event, next) {
			if('app_session' in $cookies && $rootScope.currentUser === null) {
				var session_id = $cookies.app_session.replace(/"/g, "");
				$.ajax({
					url: '/get_session/'+session_id,
					type: 'get',
					dataType: 'json',
					success: function (json) {
						if ('user' in json) {
							var user = json.user;
							user.id = session_id;
							Session.create(user.id, user._id, user.role, user.email);
							$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
							$rootScope.currentUser = user;
						}
					},
					error: function(jqXHR, textStatus, errorThrown) {
						console.log(jqXHR);
						console.log(textStatus);
						console.log(errorThrown);
					},
					complete: function() {
						check_auth(1);
					}
				});
			} else {
				check_auth(2);
			}

			function check_auth(s) {
				// console.log(s);
				var authorizedRoles = next.data.authorizedRoles;

				if (authorizedRoles.indexOf('*') !== -1) return true; // anyone can access it

				if (!AuthFactory.isAuthorized(authorizedRoles)) {
					event.preventDefault();
					if (AuthFactory.isAuthenticated()) {
						// user is not allowed
						$rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
					} else {
						// user is not logged in
						$rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
					}
					if (next.name !== "main.login" || next.name !== "main") {
						$state.go('main.login');
					}
				}
			}
		});
	}

module.exports = on_run;