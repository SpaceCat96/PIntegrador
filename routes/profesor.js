var express = require('express');
var router = express.Router();
var controller = require('../controller/profesorController');
/* GET home page. */
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

router.post('/restablecer',function(req,res,next){
	controller.newpass(req,res);
});
module.exports = router;
