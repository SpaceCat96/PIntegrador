var express = require('express');
var router = express.Router();
var prof_controller = require('../controller/movil/profesorController');
var grup_controller = require('../controller/movil/grupoController');
var salo_controller = require('../controller/movil/salonController');

//profesores
router.get('/profesores', function(req, res, next) {
	prof_controller.show(req,res)
});
router.post('/profesores/crear', function(req, res, next) {
	prof_controller.create(req,res)
});
router.post('/profesores', function(req, res, next) {
	prof_controller.credenciales(req,res)
});


//salon
router.get('/salones', function(req, res, next) {
	salo_controller.show(req,res);
});
router.post('/salones', function(req, res, next) {
	salo_controller.create(req,res);
});

//grupo
router.get('/grupos', function(req, res, next) {
	grup_controller.show(req,res);
});
router.post('/grupos', function(req, res, next) {
	grup_controller.create(req,res);
});
router.post('/grupos/postulante', function(req, res, next) {
	grup_controller.addpostu(req,res);
});
module.exports = router;
