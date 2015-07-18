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
Room.findOne({ 'roomNumber' : "1234" }, function(err, room) {
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
		room.members.push(req.body.name);
		room.cuisines.push(req.body.cuisines);
		room.prices.push(req.body.prices);
		room.allergies.push(req.body.allergies);
		console.log(room);

	}
})
});



router.get('/room', function(req, res, next) {
  roomData = {
    title: 'Room',


  };

  res.render('rooms', roomData);
});


// API CALLS
router.get('/test', function (req, res) {
  var roomNumber = req.query.number;
  Room.getRoomById(roomNumber, function(val){

  var roomData = val.data;
  console.log(roomData);

  var categoriesWeights = {};
  var priceWeights = [0, 0, 0, 0, 0];
  var keyterms = [];
  for (var i = 0; i < roomData.cuisines.length; i++) {
    if (categoriesWeights[roomData.cuisines[i]] == null) {
      categoriesWeights[roomData.cuisines[i]] = 0;
      keyterms.push(roomData.cuisines[i]);
    }
    categoriesWeights[roomData.cuisines[i]] += 1;
  }

  for (var i = 0; i < roomData.prices.length; i++){
    priceWeights[roomData.prices[i].length]++;
  }

  console.log("WEIGHTS INFO AND KEY TERMS");
  console.log(categoriesWeights);
  console.log(priceWeights);
  console.log(keyterms.join(", "));

  var query = {
    term: keyterms.join(", "),
    location: '2051 Stierlin Ct, Mountain View, CA 94043', // TODO: use GPS coords
    radius_filter: '10000'
  };
  yelp.search(query, function(error, data) {
      var restaurantsData = data.businesses.map(function(value) {
        var new_obj = {};
        new_obj.rating = value.rating;
        new_obj.name = value.name;
        new_obj.address = value.location.address;
        new_obj.yelpUrl = value.url;
        new_obj.imgUrl = value.image_url;
        new_obj.price = Math.floor((Math.random() * 10) + 1) % 4 + 1;
        new_obj.categories = value.categories.map(function(value){
            return value[0];
        });
        new_obj.score = 0;
        new_obj.categoriesVotes = 0;
        new_obj.priceVotes = 0;
        return new_obj;
      });
      calculateScores(restaurantsData);
      function scoreFn(a, b) {
        if (a.score > b.score) {
          return -1;
        }
        if (a.score < b.score) {
          return 1;
        }
        return 0;
      }
      restaurantsData.sort(scoreFn);
      res.json(restaurantsData);
  });

  function calculateScores(restaurants) {
    for (var i=0; i < restaurants.length; i++) {
      var current = restaurants[i]
      for (var j = 0; j < current.categories.length; j++) {
        var value = categoriesWeights[current.categories[j]];
        if (value) {
          current.score += 80 * value;
          current.categoriesVotes += value;
        }
      }
      current.score += 50 * priceWeights[current.price];
      current.priceVotes = priceWeights[current.price];
    }
  }
  });
});

module.exports = router;
