var express = require('express');
var router = express.Router();
var grup_controller = require('../controller/grupoController');
var controller = require('../controller/salonController');

router.get('/', function(req, res, next) {
	grup_controller.show(req,res);
});

router.post('/', function(req, res, next) {
	controller.create(req,res);
});


module.exports = router;
