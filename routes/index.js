var express = require('express');
var router = express.Router();
var User = require('../lib/users');

/* GET main home page containing the login form. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Coding Club : SOCIAL INTRANET' });
});

/* GET loginform */
router.get('/loginform', function(req, res, next){
	res.render('loginform', { title: 'Coding Club : SOCIAL INTRANET' });
})

/* GET registration form */
router.get('/registerform', function(req, res, next){
	res.render('registerform', { title: 'Coding Club : SOCIAL INTRANET' });
})

/* POST login user  */
router.post('/login', function(req, res){
	var username = req.body.username;
	var password = req.body.password;

	User.findOne({username : username, password : password}, function(err, foundUser){
		if(err){
			console.log("Error - login : ");
			return res.status(500).send("There was some error");
		}

		if(!foundUser){
			return res.status(404).send("User not found");
		}
		req.session.user = foundUser;
		return res.status(200).render("dashboard", {title: 'Coding Club : SOCIAL INTRANET' , message: "LoggedIn Successfully as "+foundUser.firstname+" "+foundUser.lastname+"("+foundUser.username+")."});
	});
});

/* POST registeration */
router.post('/register', function(req, res){
	var username = req.body.username;
	var password = req.body.password;
	var firstname = req.body.firstname;
	var lastname = req.body.lastname;

	var newUser = new User();
	newUser.username = username;
	newUser.password = password;
	newUser.firstname = firstname;
	newUser.lastname = lastname;

	newUser.save(function(err, savedUser){
		if (err){
			console.log("error in registering");
			return res.status(500).send("User could not be registered.");
		}
		console.log(savedUser);
		return res.status(200).render("dashboard", {title: 'Coding Club : SOCIAL INTRANET' , message: "Registered Successfully"});
	});
});

/* Dashboard */
router.get('/dashboard', function(req, res){
	if(!req.session.User){
		return res.status(401).send("You need to <a href='/loginform'>Login</a>");
	}
	return res.status(200).send("Welcome!! You are logged in.");
});

module.exports = router;
