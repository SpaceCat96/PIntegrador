var express = require('express');
var router = express.Router();
var controller = require('../controller/grupoController');

router.get('/', function(req, res, next) {
	controller.show(req,res);
});

router.post('/',function(req,res,next){
	controller.create(req,res);
})

router.post('/postulante',function(req,res,next){
	controller.addpostu(req,res);
})

module.exports = router;
		