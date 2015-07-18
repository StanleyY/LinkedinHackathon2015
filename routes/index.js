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
  res.render('index', { title: 'Express' });
});

// API CALLS
router.get('/test', function (req, res) {
  yelp.search({location: "San Francisco, CA"}, function(error, data) {
      console.log(data);
  });
});

module.exports = router;
