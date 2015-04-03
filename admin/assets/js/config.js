// Dependencies =================================
	var env = {
		"dev": {
			"name": "src",
			"host": "localhost"
		},
		"prd": {
			"name": "dist",
			"host": "localhost"
		}
	};

// Exposing Settings ============================
	module.exports = {
		app_name: "",
		env: env[window.le_app.env || 'dev'],
		tpl: function (view) {
			return '/assets/views/prd/'+view+'.html';
		}
	};