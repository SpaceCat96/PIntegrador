var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var mensaje="";
  res.render('user/login',{mensaje});
});

module.exports = router;
