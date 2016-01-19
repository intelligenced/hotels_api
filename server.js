// Load required packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var hotelController = require('./controllers/hotel');
var userController = require('./controllers/user');
var passport = require('passport');
var authController = require('./controllers/auth');

// Connect to the hotels MongoDB
mongoose.connect('mongodb://localhost:27017/hotelier');

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
  .post(authController.isAuthenticated, hotelController.postHotels)
  .get(authController.isAuthenticated, hotelController.getHotels);

router.route('/users')
.get(authController.isAuthenticated, userController.getUsers)
.post(userController.postUsers);


// Create endpoint handlers for /hotels/:hotel_id
router.route('/hotels/:hotel_id')
  .get(authController.isAuthenticated,hotelController.getHotel)
  .put(authController.isAuthenticated,hotelController.putHotel)
  .delete(authController.isAuthenticated,hotelController.deleteHotel);

// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(3000);