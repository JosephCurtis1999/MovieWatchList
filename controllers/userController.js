const express = require('express');
const passport = require('passport');
const fs = require("fs")
const request = require('request');
const rp = require('request-promise');


const router = express.Router();

// search for the movie by name
router.get('/keyword', function(req, res){
	var queryKeyword = req.body.searchField;
	var queryURL = 'https://www.themoviedb.org/search?query='+queryKeyword;
	request(queryURL, function(err, response, body) {
		var dataObj = JSON.parse(body);
		var hbsObj = {
			title: "Movies - User",
			data: dataObj.Search
		};
		if (req.isAuthenticated()) {
			res.render('user', hbsObj);
		} else {
			res.render('index', hbsObj);
		}
	});
});


router.get ('/', function(req, res) {
	var data = {
		title: 'Movies',
	}

	if (req.isAuthenticated()) {
		res.redirect('api/user');
	} else {
			res.render('index', data);
	}
});



router.route('/sign-up')
	.get(function(req, res) {
		res.render('sign-up', { title: 'Movies - Sign Up' });
	})
	// passport function to make sure signup is done with the proper credentials 
	.post(passport.authenticate('local-signup', {
		successRedirect: '/api/user',
		failureRedirect: '/sign-up'
}));


router.route('/login')
	.get(function(req, res) {
		res.render('login', { title: 'Movies - Login' });
	})
	// same passport functionality but for login instead
	.post(passport.authenticate('local-login', {
		successRedirect: '/api/user',
		failureRedirect: '/login'
}));

// logout just ends the login session, doesnt delete user obv
router.get('/logout', function(req, res) {
	req.session.destroy(function(err) {
		res.redirect('/');
	});
});


router.get('/user', isLoggedIn, function(req, res) {
	res.render('user', { title: 'MovieWatchList - '+req.user.username, username: req.user.username })
});


module.exports = router;


function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/login');
}