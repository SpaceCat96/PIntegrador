var express = require('express');
var router = express.Router();
var controller = require
var controller = require('../controller/salonController');

router.get('/', function(req, res, next) {
	var mensaje="";
	res.render('salon/index',{mensaje});
});

router.post('/', function(req, res, next) {
	controller.create(req,res);
});


module.exports = router;
