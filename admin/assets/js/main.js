// @main
// Luis Matute
// Apr-15

'use strict';

// Common Dependencies ==========================
	window.jQuery = window.$ = require('jquery');
	require('angular');
	require('angular-animate');
	require('angular-ui-router');


// Create and Bootstrap Angular App =============
	angular.element(document).ready(function(){
		var requires = ['ngAnimate','ui.router'];
		window.app = angular.module('app', requires);

		// App Configurations ---------
		angular.module('app').constant('Config', require('./config'));

		// Constants ------------------
		require('./constants/');

		// Factories & Services Init --
		require('./services/');
		require('./factories/');

		// Controllers Init -----------
		require('./controllers/');

		// Directives Init ------------
		// require('./directives/');

		// Routes ---------------------
		angular.module('app').config(require('./routes'));

		// App Init -------------------
		angular.module('app').run(require('./on_run'));

		// Bootstraping App to Doc ----
		angular.bootstrap(document, ['app']);
	});