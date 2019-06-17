let model = require('../models/grupoModel');
module.exports = {
	show : function(req,res){
		model.find({}).populate({
			path: 'salon_id', select: 'nombre cantPerm'
		}).populate({
			path: 'profesor_id', select: 'nombre'
		}).exec(function(err,data){		
			if(err){
				console.log(err);
				res.sendStatus(500);
			}else{
				let date = {
					"nombre": "A",
			        "salon_id": {
			            "_id": "5d071376b32e9423b85c4e70",
			            "nombre": "404",
			            "cantPerm": 20
			        }
				}
				var name = req.session.mail.username;
			    var finalName = name.substring(0, 1).toUpperCase() + name.substring(1)
			    res.render("salones/index",{datos: date},function(err,html){
					if(err) throw err;
					res.render("layouts/layout",{
						section: html,
						tituloSeccion: "Salones"
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
	create: function(req,res){
		let obj = new model;
		console.log(req.body.nombre);
		obj.nombre = req.body.nombre;
		obj.salon_id = req.body.salon_id;
		obj.profesor_id = req.body.profesor_id;
		obj.save(function(err,newData){
			if(err){
				console.log(err);
				res.send(err);
			}else{
				res.send(newData);
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
	            res.send(success);
	        }
	    });
	},
	delete: function(req,res){
	}
};