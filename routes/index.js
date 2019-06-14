var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var mensaje="";
  if (req.session.mail) {
  res.redirect('/panel');
  }
  res.render('user/login',{mensaje});
});

router.get('/panel', function(req, res, next) {
  console.log(req.session);
  if (req.session.mail) {
      var name = req.session.mail.username;
      var finalName = name.substring(0, 1).toUpperCase() + name.substring(1)
      res.render("user/panel",{user: finalName},function(err,html){
				if(err) throw err;
				res.render("layouts/layout",{
					section: html,
					tituloSeccion: "Inicio",
					user: finalName	
				 	});
				});
    } else {
    	res.redirect('/');   
    }
});

module.exports = router;
