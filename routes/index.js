var express = require('express');
var googlePlaces = require('googleplaces');
// export GOOGLE_PLACES_API_KEY="AIzaSyAKRFiBIfTf0n0gFcwb1k8vV-xC54Wknz8"
var gp = new googlePlaces(process.env.GOOGLE_PLACES_API_KEY, 'json');
var router = express.Router();
var yelp = require("yelp").createClient({
  consumer_key: "b5dyo1G64IV9V2cz8nksug",
  consumer_secret: "37JJlTe9ICV4_F-gPIbqSe0Ww7c",
  token: "Ah9oqYj1mlCwBF-9lsDjttXjt0ks9_ph",
  token_secret: "P-7HFewcOsLWCFWM7dv5aLxRYp0"
});
var mongoose = require('mongoose');
var Room = require('../models/room.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Food Cheezus',
                        slogan: 'Pray and you shall eat.',
                        buttonText: 'Plan your next meal' });
});

router.get('/vote', function(req, res, next) {
  res.render('vote', { title: 'Vote!!!' });
});

router.get('/preferences', function(req, res, next) {
  res.render('preferences', {});
});

router.post('/postTest', function(req, res, next){
	console.log(req.body);
Room.findOne({ 'groupId' : "1234" }, function(err, room) {
	if (!room) {
		console.log("THERE IS NO ROOM");
		var blah = new Room();
		blah.members.push(req.body.name);
		blah.cuisines.push(req.body.cuisines);
		blah.prices.push(req.body.prices);
		blah.allergies.push(req.body.allergies);
		console.log(blah);

	}
	else {
		console.log("THERE IS A ROOM");
	}
})
});



// API CALLS
router.get('/test', function (req, res) {
  console.log(req.query);
  yelp.search(req.query, function(error, data) {
      var cleaned = data.businesses.map(function(value) {
        var new_obj = {};
        new_obj.rating = value.rating;
        new_obj.name = value.name;
        new_obj.address = value.location.address;
        new_obj.price = Math.floor((Math.random() * 10) + 1) % 4 + 1;
        new_obj.categories = value.categories.map(function(value){
            return value[0];
        });
        return new_obj;
      });
      console.log(cleaned);
  });

  /*
  var parameters = {
        location: [37.752152, -122.419061], // Mission Street Coordinates
        radius: 5000,
        types: "restaurant",
        keyword: "Mexican"
    };
    gp.placeSearch(parameters, function (error, response) {
        if (error) throw error;
        console.log(response);
    });
    */
});

module.exports = router;
