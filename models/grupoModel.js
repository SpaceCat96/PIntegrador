
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let modelSchema = new Schema({
	nombre : { type: String , required: true ,unique: true },
	profesor_id : { type: Schema.ObjectId, ref: 'profesor' ,unique: true},
	salon_id : { type: Schema.ObjectId, ref: 'salon',unique: true},
	postulantes: [{
		p_nombre : { type: String,unique: true},
		p_codigo : { type: Number, min:100000,max:999999,unique: true}
	}]
});
let model = mongoose.model('grupo',modelSchema,'grupo');
module.exports = model;