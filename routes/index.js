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



// API CALLS
router.get('/test', function (req, res) {
//yelp.search({location: "San Francisco, CA"}, function(error, data) {
//    console.log(data);
//});

  var parameters = {
        location: [37.752152, -122.419061], // Mission Street Coordinates
        radius: 5000,
        types: "restaurant"
    };
    gp.placeSearch(parameters, function (error, response) {
        if (error) throw error;
        console.log(response);
    });
});

module.exports = router;
