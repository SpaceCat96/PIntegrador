var express = require('express');
var router = express.Router();
var controller = require('../controller/profesorController');

router.get('/', function(req, res, next) {
 
  if (req.session.mail) {
  	controller.show(req,res);
  }else{
  	redirect('/');
  }

});

router.post('/',function(req,res,next){
	controller.create(req,res);
});

router.post('/auth',function(req,res,next){
	controller.credenciales(req,res);
});

router.post('/genurl',function(req,res,next){
	controller.genurl(req,res);
});

router.post('/prueba',function(req,res,next){
	controller.body(req,res);
});

router.post('/restablecer',function(req,res,next){
	controller.newpass(req,res);
});
module.exports = router;
