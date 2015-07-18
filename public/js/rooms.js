
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

var restaurants = [r1, r2, r3];

// $.material.init()

var app = angular.module('foodcheezus', ['lumx']).
controller('rooms', function($scope) {
  $scope.test = "MEEPEPPEP";
  $scope.restaurants = restaurants;

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

getLocation();