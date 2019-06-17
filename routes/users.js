var express = require('express');
var passport = require('passport');
var Account = require('../models/account');

var router = express.Router();

router.get('/', function(req, res, next) {
	var mensaje="";
	res.render('user/login',{mensaje});
});

router.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
            return res.render('register', { account : account });
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/users/panel');
        });
    });
});

router.get('/login', function(req, res,next) {
	var mensaje = ""
	if (req.session.mail) {
    	res.render('user/login',{mensaje});
    }else{
    	res.redirect('/'); 
    }
});


router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.render('user/login',{mensaje:"Error de Usuario o Contraseña, intentelo denuevo.<br>"}); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      req.session.mail=user;
      console.log(req.session.mail);
      //req.session.mail.username=user.username;
      if(req.session.mail != null){
      res.redirect('/panel');
  	  }
    });
  })(req, res, next);	
});

router.get('/logout', function(req, res,next) {
	req.session.destroy();
    req.logout();
    res.redirect('/');
});

router.get('/panel', function(req, res, next) {
    if (req.session.mail) {
      var name = req.session.mail.username;
      var finalName = name.substring(0, 1).toUpperCase() + name.substring(1)
      res.render("user/panel",{user: finalName},function(err,html){
				if(err) throw err;
				res.render("layouts/layout",{
					section: html,
					tituloSeccion: "Inicio",
					user: finalName	
				 	});
				});
    } else {
    	res.redirect('/');   
    }
});

module.exports = router;
