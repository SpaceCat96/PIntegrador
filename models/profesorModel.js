let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let modelSchema = new Schema({
	codigo : { type: String , required: true },
	nombre : { type: String , required: true },
	username : { type: String },
	password : { type: String }
});
let model = mongoose.model('profesor',modelSchema,'profesor');
module.exports = model;