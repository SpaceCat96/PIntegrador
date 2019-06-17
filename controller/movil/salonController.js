let model = require('../../models/salonModel');
module.exports = {
	show : function(req,res){
		model.find({}).exec(function(err,data){			
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
		obj.nombre = req.body.nombre;
		obj.cantPerm = req.body.cantPerm;
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
			cantPerm : req.body.cantPerm
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
		let val_id = req.body.id;
		model.deleteOne({ _id:val_id}, function (err) {
			if(err){
				console.log(err);
				res.sendStatus(500);
			}else{
				res.send(true);
			}
		});
	}
};