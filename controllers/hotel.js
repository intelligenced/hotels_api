var Hotel = require('../models/hotel.js');

exports.postHotels = function(req,res){

	var hotel = new Hotel();
	hotel.name = req.body.name;
	hotel.type = req.body.type;
	hotel.quantity = req.body.quantity;
	hotel.userId = req.user._id;


	hotel.save(function(err){
		if(err) res.send(err);

		res.json({message:"hotel added", data:hotel})
	});

}


exports.getHotels = function(req,res){
	Hotel.find({userId:req.user._id}, function(err,hotel){
		if(err) res.send(err);
		res.json(hotel);
	})
}


exports.getHotel = function(req,res){
	  Hotel.find({userId:req.user._id, _id:req.params.hotel_id}, function(err, hotel) {
    if (err)
      res.send(err);

    res.json(hotel);
  });
}

exports.putHotel = function(req,res){
	Hotel.update({userId:req.user._id,_id:req.params.hotel_id}, {quantity:req.body.quantity}, function(err,hotel){
		if(err) res.send(err)
		res.json({message:num + 'updated'});

	})
}

exports.deleteHotel = function(req,res){
	Hotel.remove({userId:req.user._id, _id:req.params.hotel_id},function(err){
		if(err) res.send(err);

		res.json({message:"hotel removed"});
	})
}