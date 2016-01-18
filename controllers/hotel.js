var Hotel = require('../models/hotel.js');

exports.postHotels = function(req,res){

	var hotel = new Hotel();
	hotel.name = req.body.name;
	hotel.type = req.body.type;
	hotel.quantity = req.body.quantity;

	hotel.save(function(err){
		if(err) res.send(err);

		res.json({message:"hotel added", data:hotel})
	});

}


exports.getHotels = function(req,res){
	Hotel.find(function(err,hotel){
		if(err) res.send(err);
		res.json(hotel);
	});
}


exports.getHotel = function(req,res){
	  Hotel.findById(req.params.hotel_id, function(err, hotel) {
    if (err)
      res.send(err);

    res.json(hotel);
  });
}

exports.putHotel = function(req,res){
	Hotel.findById(req.params.hotel_id, function(err,hotel){
		if(err) res.send(err);

		hotel.quantity = req.body.quantity;

		hotel.save(function(err){
			if(err) res.send(err);

			res.json(hotel);
		})
	})
}

exports.deleteHotel = function(req,res){
	Hotel.findByIdAndRemove(req.params.hotel_id,function(err){
		if(err) res.send(err);

		res.json({message:"hotel removed"});
	})
}