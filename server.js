// Load required packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var hotelController = require('./controllers/hotel');
var userController = require('./controllers/user');


// Connect to the beerlocker MongoDB
mongoose.connect('mongodb://localhost:27017/hotels');

// Create our Express application
var app = express();

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

// Create our Express router
var router = express.Router();

// Create endpoint handlers for /hotels
router.route('/hotels')
  .post(hotelController.postHotels)
  .get(hotelController.getHotels);

router.route('/users')
.get(userController.getUsers)
.post(userController.postUsers);


// Create endpoint handlers for /hotels/:hotel_id
router.route('/hotels/:hotel_id')
  .get(hotelController.getHotel)
  .put(hotelController.putHotel)
  .delete(hotelController.deleteHotel);

// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(3000);