var bCrypt = require('bcrypt-nodejs');
const { Users } = require('../../models');

module.exports = function(passport, user) {
	var User = user;
	const localStrategy = require('passport-local').Strategy;

	passport.use('local-signup', new localStrategy({
		usernameField: 'username',
		passwordField: 'password',
		passReqToCallback: true
	}, function(req, username, password, done) {

		// encrypts the password stored in the database
		var generateHash = function(password) {
			return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
		};

		// used to find a single user in order to sign them in
		Users.findOne({
			where: {
				username: username
			}
		}).then(function(user) {

			if (user) {
				return done(null, false, { message: 'That username is already taken' });
			} else {
				var userPassword = generateHash(password);

				var userData = {
					username: username,
					password: userPassword,
					email: req.body.email
				};

				Users.create(userData).then(function(newUser, created) {
					if (!newUser) {
						return done(null, false);
					}

					if (newUser) {
						return done(null, newUser);
					}
				});
			}
		});
	}));

	// dont really know why serialize and deserialize is important but 
	// passport doesnt work without it 
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		Users.findByPk(id).then(function(user) {
			if (user) {
				done(null, user.get());
			} else {
				done(user.errors, null);
			}
		});
	});

	passport.use('local-login', new localStrategy({
		usernameField: 'username',
		passwordField: 'password',
		passReqToCallback: true
	}, function(req, username, password, done) {
		var User = user;

		// compares passwords to let users sign in
		var isValidPassword = function(userPass, password) {
			return bCrypt.compareSync(password, userPass);
		}

		Users.findOne({
			where: {
				username: username
			}
			// checking if the entered info is right or wrong
		}).then(function(user) {
			if (!user) {
				return done(null, false, { message: 'Username does not exist.' });
			}

			if (!isValidPassword(user.password, password)) {
				return done(null, false, { message: 'Incorrect password.' });
			}

			var userInfo = user.get();
			return done(null, userInfo);

		}).catch(function(err) {
			console.log('Error: ' + err);
			return done(null, false, { message: 'Something went wrong with your login.' });
		});
	}));
}