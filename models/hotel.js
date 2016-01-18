var mongoose = require('mongoose');

var HotelSchema = new mongoose.Schema({
	name:String,
	type:String,
	quantity:Number
})

module.exports = mongoose.model('Hotel',HotelSchema)