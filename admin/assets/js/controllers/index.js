'use strict';

// Dependencies ==========================
	var angular = require('angular');

// Define the list of controllers here
	require('./main');
	require('./login');
	require('./contacts');

// Exposing Module ============================
	module.exports = angular.module('app.controllers', []);