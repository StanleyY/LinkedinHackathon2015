
var r1 = {
  name: 'Burger King',
  categories: ['American', 'Fast Food'],
  allergies: ['seafood', 'beef'],
  price: '$',
  rating: 4.3,
  address: '1234 Hamburglur St',
  imgUrl: 'http://assets.vice.com/content-images/contentimage/178926/Burger-King-in-London.jpg',
  yelpUrl: 'http://www.yelp.com/biz/burger-king-san-francisco-4'
};

var r2 = {
  name: 'Szechuan Palace',
  categories: ['Chinese', 'Szechuan'],
  allergies: ['seafood', 'beef'],
  price: '$$$',
  rating: 4.1,
  address: '1234 Chinatown',
  imgUrl: 'http://english.eastday.com/e/cy/images/01457218.jpg',
  yelpUrl: 'http://www.yelp.com/biz/sichuan-home-san-francisco'
};

var r3 = {
  name: 'Fancy Steakhouse',
  categories: ['American', 'Steakhouse'],
  allergies: ['beef'],
  price: '$$$$',
  rating: 4.9,
  address: '1221 Mirada Ave.',
  imgUrl: 'http://media.dfrg.com/_sullivanssteakhouse/gallery/chicago-02-popup.jpg',
  yelpUrl: 'http://www.yelp.com/biz/alexanders-steakhouse-san-francisco'
};

var r4 = { rating: 3.5,
    name: 'Mission Chinese Food',
    address: [ 'Lung Shan Restaurant', '2234 Mission St' ],
    price: 2,
    categories: [ 'Chinese' ],
    score: 570,
    categoriesVotes: 4,
    priceVotes: 5,
    imgUrl: 'http://media.dfrg.com/_sullivanssteakhouse/gallery/chicago-02-popup.jpg',
    yelpUrl: 'http://www.yelp.com/biz/alexanders-steakhouse-san-francisco'
  };


// var restaurants = [r1, r2, r3];
var restaurants = [r4];

// $.material.init()

var app = angular.module('foodcheezus', ['lumx']).
controller('rooms', function($scope, $http, $location) {
  $scope.test = "MEEPEPPEP";

  var url = $location.absUrl();

  var thing = url.split("/");
  console.log(thing);

  var roomNum = thing[thing.length - 2];
  console.log(roomNum);

  $scope.loaded = false;

  var promise = $http.get("/test?number=" + roomNum);

  promise.success(function(data){
    // console.log(data);
    restaurants = data;
  for (var i = 0; i < restaurants.length; i++) {
    var priceStr = "";
    for (var j = 0; j < restaurants[i].price; j++) {
      priceStr += "$";
    }
    restaurants[i].priceStr = priceStr;

    var categoriesStr = "";
    for (var j = 0; j < restaurants[i].categories.length; j++) {
      categoriesStr += restaurants[i].categories[j] + " ";
      if (j < restaurants[i].categories.length - 1) categoriesStr + "| ";
    }
    restaurants[i].categoriesStr = categoriesStr;

  }
  $scope.restaurants = restaurants;
  $scope.loaded = true;

  });
});

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}
function showPosition(position) {
     console.log("Latitude: " + position.coords.latitude + "\n" + "Longitude: " + position.coords.longitude);
}
