let model = require('../../models/profesorModel');
let grupo = require('../../models/grupoModel');
let Cryptr = require('cryptr');
let cryptr = new Cryptr('123456');

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
		obj.username = req.body.codigo;
		obj.password = cryptr.encrypt(req.body.codigo);
		obj.save(function(err,newData){
			if(err){
				console.log(err);
				res.sendStatus(500);
			}else{
				//res.send(newData);
				res.json(newData);
			}
		});
	},
	update: function(req,res){
		let val_id = req.body.id;
		let datos = {
			nombre : req.body.nombre,
			codigo : req.body.codigo
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
		let val_id = req.params.id;
		model.deleteOne({_id:val_id},function(err){
			if(err){
				console.log(err);
				res.sendStatus(500);
			}else{
				res.send(true);
			}
		});
	},
	getalumnos:function(req,res){
		let val_id = req.body.id;
		grupo.find({profesor_id:val_id},'postulantes').exec(function(err,data){			
			if(err){
				console.log(err);
				res.sendStatus(500);
			}else{	
				res.json(data);
			}
		});
	},
	credenciales: function(req,res){
		let user = req.body.username;
		let pass = req.body.password;
		model.findOne({username:user},function(err,data){
			if(err){

				res.send(false);
			}else{
				
				var profe=data._id;
				var pass_ori = cryptr.decrypt(data.password);
				if(pass_ori == pass){
					/**grupo.find({profesor_id:profe},'postulantes').exec(function(error,items){
						if(error){
							console.log(error);
							res.sendStatus(500);
						}else{	
								res.send(items._id);
						} 
					});**/
					datos = {
						'id':data._id
					}

					res.send(datos);
				}else{
					res.send(false);
				}	
			}	
		});
	},

};	