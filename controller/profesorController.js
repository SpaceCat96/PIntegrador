//productoController.js
let model = require('../models/profesorModel');
let grupo = require('../models/grupoModel');
let Cryptr = require('cryptr');
let cryptr = new Cryptr('123456');

module.exports = {
	show : function(req,res){
		model.find({}).exec(function(err,data){
			
			if(err){
				console.log(err);
				res.sendStatus(500);
			}else{	
				var name = req.session.mail.username;
			    var finalName = name.substring(0, 1).toUpperCase() + name.substring(1)
			    res.render("profesores/index",{datos: data},function(err,html){
			    	console.log(data);
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
		obj.nombre = req.body.nombre;
		obj.codigo = req.body.codigo;
		obj.username = req.body.codigo;
		obj.password = cryptr.encrypt(req.body.codigo);
		obj.save(function(err,newData){
			if(err){
				console.log(err);
				res.sendStatus(500);
			}else{
				//res.send(newData);
				res.redirect('/profesor');
			}
		});
	},
	update: function(req,res){
		let val_id = req.body.id;
		let datos = {
			nombre : req.body.nombre,
			username : req.body.codigo
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

	},
	credenciales: function(req,res){
		console.log(req.body.username);
		console.log(req.body.password);
		let user = req.body.username;
		let pass = req.body.password;
		var datos;
		model.findOne({username:user},function(err,data){
			if(err){
				console.log("Usuario No Encontrado");
				res.send(false);
			}else{
				var profe=datos._id;
				var pass_ori = cryptr.decrypt(data.password);
				if(pass_ori == pass){
					grupo.find({profesor_id:datos},'postulantes').exec(function(error,items){
						console.log(data._id);
						console.log(items);
						if(error){
							console.log(error);
							res.sendStatus(500);
						}else{
								res.json(items);
						} 
					});
				}else{
					res.send(false)
				}	
			}	
		});
	},

	genurl:function(req,res){
		let user = req.body.username;
		var con;
		enigma.genHash(vEncrip,key,user,function(err,hash){
		    if(err) return console.log(err);//Solo se ejecutara si existe un error
		    console.log(hash)//2dl3lkwkj13kj12k12kj321kj
			con = hash;//esa funcion retorna por defecto en hash la contraseña encriptada
		});
		console.log('/profesor/restablecer/?id='+con);
	},
	newpass: function(req,res){
		console.log("responde");
		//let encrip_user = req.body.id;
		let new_pass = req.body.password;
		var user;
		//console.log(encrip_user);
		console.log(new_pass);
		enigma.Desencriptar(new_pass,function(err,des){
    		if(err) return console.log(err);
    		console.log(des);
    		user = des;
		});

		console.log(user);
		console.log(new_pass);
		/**model.findOne({username:user},function(err,data){
			if(err){
				console.log("Usuario No Encontrado");
			}else{
				enigma.comparar(data.password,pass,function(err,response){
    				if(err) console.log(err);
    				console.log(response)
    				if(response){   				
	    				model.updateOne({_id:val_id},datos,function(err,newData){
							if(err){
								console.log(err);
								res.sendStatus(500);
							}else{
								res.send(newData);
							}
						});
					}else{
						console.log("Contraseña Incorrecta");
					}	
				});
			}	
		});**/

	}
};	