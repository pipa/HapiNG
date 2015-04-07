'use strict';

// Dependencies =================================
	var angular = require('angular');

// Factory ======================================
	var ContactsFactory = function($http) {
		var contacts = {
			read: function(contact_id) {
				var url = (typeof contact_id !== 'undefined' && contact_id !== '')? '/api/contact/'+contact_id: '/api/contact';
				return $.ajax({
					url: url,
					type: 'get',
					dataType: 'json'
				});
			},
			delete: function(contact_id) {
				return $.ajax({
					url: '/api/contact/' + contact_id,
					type: 'DELETE',
					dataType: 'json'
				});
			}
		};

		return contacts;
	};

// @ngInject ====================================
	app.factory('ContactsFactory', ContactsFactory);