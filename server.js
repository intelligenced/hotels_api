// Get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var Hotel = require('./models/hotel');
var bodyParser = require('body-parser');

// Create our Express application
var app = express();

app.use(bodyParser.urlencoded({
	extended:true
}))

mongoose.connect('mongodb://localhost:27017/hotels');

// Use environment defined port or 3000
var port = process.env.PORT || 3000;

// Create our Express router
var router = express.Router();

// Initial dummy route for testing
// http://localhost:3000/api

router.get('/', function(req, res) {
  res.json({ message: 'Welcome to the hotels' });
});

var hotelRoute = router.route('/hotel');

hotelRoute.post(function(req,res){
	var hotel = new Hotel();
	hotel.name = req.body.name;
	hotel.type = req.body.type;
	hotel.quantity = req.body.quantity;

	hotel.save(function(err){
		if(err) res.send(err);

		res.json({message:"hotel added", data:hotel})
	});

});

hotelRoute.get(function(req,res){
	Hotel.find(function(err,hotel){
		if(err) res.send(err);
		res.json(hotel);
	});
});

// Create a new route with the /hotel/:hotel_id prefix
var hotelRoute = router.route('/hotel/:hotel_id');

// Create endpoint /api/hotel/:hotel_id for GET
hotelRoute.get(function(req, res) {
  // Use the hotel model to find a specific beer
  Hotel.findById(req.params.hotel_id, function(err, hotel) {
    if (err)
      res.send(err);

    res.json(hotel);
  });
});

// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(port);
console.log('Insert hotel on port ' + port);