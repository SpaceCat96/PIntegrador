
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let modelSchema = new Schema({
	nombre : { type: String , required: true ,unique: true },
	profesor_id : { type: Schema.ObjectId, ref: 'profesor' },
	salon_id : { type: Schema.ObjectId, ref: 'salon'},
	postulantes: [{
		p_nombre : { type: String},
		p_codigo : { type: Number, min:100000,max:999999}
	}]
});
let model = mongoose.model('grupo',modelSchema,'grupo');
module.exports = model;