var questions = [
"Pick your favorite cuisines.",
"Do you have any allergies?",
"What's your price preference?"


];

var answers = [[
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
], [
"eggs",
"fish",
"milk",
"nuts",
"shellfish",
"soya",
"wheat"
],[
"$",
"$$",
"$$$",
"$$$$"
]];
var app = angular.module('foodcheezus', []).
controller('preferences', function($scope, $http) {
  $scope.userPreferences = {
    "cuisines":[],
    "allergies":[],
    "prices": [],
    "name": ""
  }
  $scope.counter = 0;
  $scope.hasName = false;
  $scope.question = "What's your name?";
  $scope.grabName = function(){
    $scope.userPreferences["name"] = $("#nickName").val();
    $scope.hasName = true;
       $scope.answers = answers[$scope.counter];
  $scope.question = questions[$scope.counter];
  }
  $scope.next = function(){
    if ($scope.counter == questions.length-1){
      $(":checked").each(function(i, val){
        $scope.userPreferences["prices"].push(val.id);
      });
      console.log($scope.userPreferences);
      $http.post('/postTest', $scope.userPreferences).
      success(function(data, status, headers, config) {
        console.log(data);
    }).
      error(function(data, status, headers, config) {
        console.log(data);
      });
    }
    else {
      if ($scope.counter == 0){
        $(":checked").each(function(i, val){
          $scope.userPreferences["cuisines"].push(val.id);
        });
      }
      else if ($scope.counter == 1){
        $(":checked").each(function(i, val){
          $scope.userPreferences["allergies"].push(val.id);
        });
      }
      else if ($scope.counter == 2){
      }
      else {
        $scope.answers = [];
      }
      $scope.counter++;
      $scope.question = questions[$scope.counter];
      $scope.answers = answers[$scope.counter];
    }
  }
  $scope.messages = "MESSAGES NOW";
});