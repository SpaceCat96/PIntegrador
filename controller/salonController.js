let model = require('../models/salonModel');
module.exports = {
	show : function(req,res){
		model.find({}).exec(function(err,data){
			
			if(err){
				console.log(err);
				res.sendStatus(500);
			}else{
				var name = req.session.mail.username;
			    var finalName = name.substring(0, 1).toUpperCase() + name.substring(1)
			    res.render("salones/index",{datos: data},function(err,html){
			    	console.log(data);
					if(err) throw err;
					res.render("layouts/layout",{
						section: html,
						tituloSeccion: "Responsables"
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
		obj.nombre = req.body.nombre;
		obj.cantPerm = req.body.desc;
		obj.save(function(err,newData){
			if(err){
				console.log(err);
				res.sendStatus(500);
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
	delete: function(req,res){
	}
};