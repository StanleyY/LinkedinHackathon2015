var questions = [
"Pick your favorite cuisines.",
"Do you have any allergies?",
"What's your price preference?"


];
var cuisines = [
"French",
"Italian",
"Chinese",
"Indian",
"Thai",
"Mexican",
"Japanese",
"Spanish",
"Greek",
"Lebanese"
];
var allergies = [
"eggs",
"fish",
"milk",
"nuts",
"shellfish",
"soya",
"wheat"
];
var prices = [
"$",
"$$",
"$$$",
"$$$$"
]
var app = angular.module('foodcheezus', []).
controller('preferences', function($scope) {
  $scope.answers = cuisines;
  $scope.counter = 0;
  $scope.question = questions[$scope.counter]
  $scope.next = function(){
    if ($scope.counter == questions.length-1){

    }
    else {
      $scope.counter++;
      $scope.question = questions[$scope.counter];
      if ($scope.counter == 1){
        $scope.answers = allergies;
      }
      else if ($scope.counter == 2){
        $scope.answers = prices;
      }
      else {
        $scope.answers = [];
      }
    }
  }
  $scope.messages = "MESSAGES NOW";
});