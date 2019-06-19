let model = require('../models/grupoModel');
let salon = require('../models/salonModel');
let profe = require('../models/profesorModel');

module.exports = {
	show : function(req,res){
		model.find({}).populate({
			path: 'salon_id', select: 'nombre cantPerm'
		}).populate({
			path: 'profesor_id', select: 'nombre'
		}).exec(function(err,items){		
			if(err){
				console.log(err);
				res.sendStatus(500);
			}else{
				var name = req.session.mail.username;
			    var finalName = name.substring(0, 1).toUpperCase() + name.substring(1);
			    console.log("------------");
			    console.log("-------------");
			   
				console.log(items);
			    res.render("salones/grupo",{items},function(err,html){
					if(err) throw err;
					res.render("layouts/layout",{
						section: html,
						tituloSeccion: "Grupos"
					});
				});
			}
		});
	},
	alumnoshow : function(req,res){
		model.find({},'postulantes').exec(function(err,items){		
			if(err){
				console.log(err);
				res.sendStatus(500);
				console.log(items);
			}else{
				var name = req.session.mail.username;
			    var finalName = name.substring(0, 1).toUpperCase() + name.substring(1);
			    console.log("------------");
			    console.log("-------------");

				res.render("alumnos/index",{items},function(err,html){
					if(err) throw err;
					res.render("layouts/layout",{
						section: html,
						tituloSeccion: "Alumnos"
					});
				});
			}
		});
	},
	detail : function(req,res){
		let val_id = req.params.id;
		model.findOne({_id:val_id},function(err,data){
			if(err){
				console.log(err);
				res.sendStatus(500);
			}else{
				res.send(data);
			}
		});
	},
	newgroup:function(req,res){
		salon.find({}).exec(function(err,items){		
			if(err){
				console.log(err);
				res.sendStatus(500);
			}else{
				profe.find({}).exec(function(err,datos){
					console.log(items);
					console.log("-----------");
					console.log(datos);
					res.render("salones/newgroup",{items,datos},function(err,html){
						if(err) throw err;
						res.render("layouts/layout",{
							section: html,
							tituloSeccion: "Nuevo Grupo"
						 });
					});
				});
			}
		});
	},
	create: function(req,res){
		let obj = new model;
		console.log(req.body.nombre);
		obj.nombre = req.body.nombre;
		obj.salon_id = req.body.salon_id;
		obj.profesor_id = req.body.profesor_id;
		obj.save(function(err,newData){
			if(err){
				console.log(err);
				if(err.code == 11000)
				{
					res.redirect("/?mensaje=Duplicado");
				}
			}else{
				res.redirect("/salon");
			}
		});
	},
	update: function(req,res){
		let val_id = req.body.id;
		let datos = {
			nombre : req.body.nombre,
			cantPerm : req.body.cant
		};
		model.updateOne({_id:val_id},datos,function(err,newData){
			if(err){
				console.log(err);
				res.sendStatus(500);
			}else{
				res.send(newData);
			}
		});
	},
	addpostu: function(req,res){
		let val_id = req.body.id;
		data = {
			'p_codigo': req.body.codigo,
			'p_nombre': req.body.nombre,
			}
	  	model.findOneAndUpdate(
	   { _id:val_id}, 
	   { $push: { postulantes: data  } },
	   function (err, success) {	
	        if (err) {
	            console.log(err);
				res.sendStatus(500);
	        } else {
	            res.redirect("/salon");
	        }
	    });
	},
	delete: function(req,res){
	}
};