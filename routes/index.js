var express = require('express');
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

<<<<<<< HEAD
router.get('/preferences', function(req, res, next) {
  res.render('preferences', {});
});


=======
// API CALLS
router.get('/test', function (req, res) {
  yelp.search({location: "San Francisco, CA"}, function(error, data) {
      console.log(data);
  });
});

>>>>>>> 245b8eac8b7a754fd609f6992b2774662066b276
module.exports = router;
