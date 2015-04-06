'use strict';

// Local Vars ===================================
	var Mongoose 	= require('mongoose'),
		Schema 		= Mongoose.Schema,
		bcrypt 		= require('bcrypt'),
		SALT_WORK_FACTOR = 10;

// Contact Schema ===============================
	var User_Schema = Schema({
			username: { type: String, required: true },
			password: { type: String, required: true }
			email: { type: String, required: true }
		});

	User_Schema.pre('save', function(next) {
		var user = this;

		// only hash the password if it has been modified (or is new)
		if (!user.isModified('password')) return next();

		// generate a salt
		bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
			if (err) return next(err);

			// hash the password using our new salt
			bcrypt.hash(user.password, salt, function(err, hash) {
				if (err) return next(err);

				// override the cleartext password with the hashed one
				user.password = hash;
				next();
			});
		});
	});

	UserSchema.methods.comparePassword = function(candidatePassword, cb) {
		bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
			if (err) return cb(err);
			cb(null, isMatch);
		});
	};

	var user = Mongoose.model('user', User_Schema);

// Schema export ================================
	module.exports = user