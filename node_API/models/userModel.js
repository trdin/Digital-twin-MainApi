var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	'username': { type: String, index: { unique: true, dropDups: true } },
	'email': { type: String, index: { unique: true, dropDups: true } },
	'password': {
		type: String,
		required: true
	},
	'token': { type: String },
	'admin': { type: Boolean, default: false }
});
/*
userSchema.pre('save', function (next) {
	var user = this;
	bcrypt.hash(user.password, 10, function (err, hash) {
		if (err) {
			return next(err);
		}
		user.password = hash;
		next();
	});
});*/

userSchema.statics.authenticate = function (username, password, callback) {
	console.log('authenticate', username, password)
	User.findOne({ username: username })
		.exec(function (err, user) {
			if (err) {
				return callback(err);
			} else if (!user) {
				var err = new Error("User not found.");
				err.status = 401;
				return callback(err);
			}
			bcrypt.compare(password, user.password, function (err, result) {
				console.log(err)
				if (result === true) {
					return callback(null, user);
				} else {
					return callback();
				}
			});

		});
}

var User = mongoose.model('user', userSchema);

bcrypt.hash((process.env.adminPassword || 'admin'), 10, function (err, hash) {
	var admin = new User({ username: 'admin', email: 'nomail', password: hash, admin: true })

	admin.save(function (err, admin) {
		if (err) return console.error(err);
		console.log("Admin user created.")
	})
})

module.exports = User;
