let model = require('../../models/grupoModel');
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
				res.json(data);
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
				res.json(data);
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
				res.json(newData);
			}
		});
	},
	update: function(req,res){
		let val_id = req.body.id;
		let datos = {
			'nombre' :req.body.nombre,
			'salon_id' : req.body.salon_id,
			'profesor_id' :req.body.profesor_id
		};
		model.updateOne({_id:val_id},datos,function(err,newData){
			if(err){
				console.log(err);
				res.sendStatus(500);
			}else{
				res.json(newData);
			}
		});
	},
	addpostu: function(req,res){
		let val_id = req.body.id;
		data = {
			'p_codigo': req.body.codigo,
			'p_nombre': req.body.nombre,
			}
	  	model.findOneAndUpdate({ _id:val_id},{ $push: { postulantes: data } },
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
		let val_id = req.body.id;
		model.deleteOne({_id:val_id}, function (err) {
			if (err) {
	            console.log(err);
				res.sendStatus(500);
	        } else {
	            res.send(true);
	        }
		});
	}
};