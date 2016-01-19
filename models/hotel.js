var mongoose = require('mongoose');

var HotelSchema = new mongoose.Schema({
	name:String,
	type:String,
	quantity:Number,
	userId:String
})

module.exports = mongoose.model('Hotel',HotelSchema)