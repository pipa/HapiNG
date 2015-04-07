"use strict";

// Dependencies =================================

// Controller Function ==========================
	var contacts_ctrl = function ($scope, ContactsFactory) {
		$scope.contacts = [];

		// On each request
		$scope.$on('$stateChangeSuccess', function(event, toState, toParams) {
			// console.log(arguments);
			var contact_id = ('contact_id' in toParams)? toParams.contact_id: '';
			populate_contacts(contact_id);
		});

		$scope.delete_contact = function(contact) {
			ContactsFactory
				.delete(contact._id)
				.success(function (json) {
					console.log(json);
					var contact_index = $scope.contacts.indexOf(contact);
					$scope.contacts.splice( contact_index, 1 );
					$scope.$apply();
				})
				.error(function(jqXHR, textStatus, errorThrown) {
					console.log(jqXHR);
					console.log(textStatus);
					console.log(errorThrown);
				});
		};

		var populate_contacts = function(contact_id) {
			ContactsFactory
				.read(contact_id)
				.success(function (json) {
					console.log(json);
					$scope.contacts = json;
					$scope.$apply();
				})
				.error(function(jqXHR, textStatus, errorThrown) {
					console.log(jqXHR);
					console.log(textStatus);
					console.log(errorThrown);
				});
		};
	};

// @ngInject ====================================
	app.controller('contacts_ctrl', contacts_ctrl);


