// Local Vars ===================================
	var yar = function(server) {
		server.register({
			register: require('yar'),
			options: {
				cache: {
					expiresIn: 5*1000
				},
				cookieOptions: {
					password: 'trustno1',
					isSecure: false,
					isHttpOnly: true
				}
			}
			}, function(err) {
				if (err) throw err; // something bad happened loading the plugin
			}
		);
	};

// Plugin export ================================
	module.exports = yar;

