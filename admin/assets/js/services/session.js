'use strict';

// Service ======================================
	var SessionService = function() {
		this.create = function (sessionId, userId, userRole, email) {
			this.id = sessionId;
			this.user_id = userId;
			this.user_role = userRole;
			this.email = email;
		};
		this.destroy = function () {
			this.id = null;
			this.user_id = null;
			this.user_role = null;
			this.email = null;
		};
	};

// @ngInject ====================================
	app.service('Session', SessionService);