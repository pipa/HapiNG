'use strict';

var angular = require('angular');

module.exports = angular.module('app.factories', []);

// Define the list of factories here
require('./auth.js');
require('./auth_interceptor.js');
require('./ui-notifications.js');