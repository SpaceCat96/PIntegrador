var express = require('express');
var router = express.Router();
var grup_controller = require('../controller/grupoController');
var controller = require('../controller/salonController');

router.get('/', function(req, res, next) {
	if (req.session.mail) {
		grup_controller.show(req,res);
	}else{
		res.redirect('/');
	}
});

router.get('/lista', function(req, res, next) {
	if (req.session.mail) {
		controller.show(req,res);
	}else{
		res.redirect('/');
	}
});

router.post('/', function(req, res, next) {
	if (req.session.mail) {
		controller.create(req,res);
	}else{
		res.redirect('/');
	}
});

router.post('/editar', function(req, res, next) {
	if (req.session.mail) {
		controller.update(req,res);
	}else{
		res.redirect('/');
	}
});


module.exports = router;
