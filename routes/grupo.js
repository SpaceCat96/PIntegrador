var express = require('express');
var router = express.Router();
var controller = require('../controller/grupoController');

router.get('/', function(req, res, next) {
	if (req.session.mail) {
		controller.show(req,res);
	}else{
		res.redirect('/');
	}
});

router.post('/',function(req,res,next){
	if (req.session.mail) {
		controller.create(req,res);
	}else{
		res.redirect('/');
	}
});

router.post('/postulante',function(req,res,next){
	if (req.session.mail) {
		controller.addpostu(req,res);
	}else{
		res.redirect('/');
	}
});

router.get('/postulante',function(req,res,next){
	if (req.session.mail) {
		controller.alumnoshow(req,res);
	}else{
		res.redirect('/');
	}
})

module.exports = router;
		