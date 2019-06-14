let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let modelSchema = new Schema({
	nombre : { type: String , required: true },
	cantPerm : { type: String , required: true }
});
let model = mongoose.model('salon',modelSchema,'salon');
module.exports = model;