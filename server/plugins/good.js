// Local Vars ===================================
	var good = function(server) {
		server.register({
			register: require('good'),
			name: 'good',
			options: {
				reporters: [{
					reporter: require('good-console'),
					args:[{ log: '*', response: '*' }]
				}]
			}
			}, function(err) {
				if (err) throw err; // something bad happened loading the plugin
			}
		);
	};

// Plugin export ================================
	module.exports = good;

