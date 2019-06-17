let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let modelSchema = new Schema({
	nombre : { type: String , required: true,unique: true },
	cantPerm : { type: Number, required: true }
});
let model = mongoose.model('salon',modelSchema,'salon');
module.exports = model;