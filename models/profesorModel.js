let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let modelSchema = new Schema({
	nombre : { type: String , required: true},
	username : { type: String , required: true,unique: true },
	password : { type: String }
});
let model = mongoose.model('profesor',modelSchema,'profesor');
module.exports = model;