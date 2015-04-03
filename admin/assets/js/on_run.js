"use strict";

// @ngInject ====================================
	function on_run($rootScope, Config) {
		$rootScope.app_name = Config.app_name;
		$rootScope.title = Config.app_name;

		// Application Vars
		$rootScope.le_app = window.le_app;
	}

module.exports = on_run;