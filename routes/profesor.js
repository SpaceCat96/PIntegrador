var express = require('express');
var router = express.Router();
var controller = require('../controller/profesorController');

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
router.post('/auth',function(req,res,next){
	if (req.session.mail) {
		controller.credenciales(req,res);
	}else{
		res.redirect('/');
	}
});
router.post('/delete',function(req,res,next){
	if (req.session.mail) {
		controller.delete(req,res);
	}else{
		res.redirect('/');
	}
});
router.post('/genurl',function(req,res,next){
	if (req.session.mail) {
		controller.genurl(req,res);
	}else{
		res.redirect('/');
	}	
});
router.post('/editar',function(req,res,next){
	if (req.session.mail) {
		controller.update(req,res);
	}else{
		res.redirect('/');
	}	
});
router.post('/restablecer',function(req,res,next){
	if (req.session.mail) {
		controller.newpass(req,res);
	}else{
		res.redirect('/');
	}
});
module.exports = router;
