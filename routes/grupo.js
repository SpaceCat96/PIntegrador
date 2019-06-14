var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var mensaje="";
  res.render('alumnos/index',{mensaje});
});






module.exports = router;
