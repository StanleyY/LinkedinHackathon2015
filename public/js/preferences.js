var questions = [
"Pick your favorite cuisines.",
"Do you have any allergies?",
"What's your price preference?"


];

var answers = [[
"American",
"French",
"Italian",
"Chinese",
"Indian",
"Thai",
"Mexican",
"Japanese",
"Spanish",
"Greek"
], [
"eggs",
"fish",
"milk",
"nuts",
"shellfish",
"soy",
"wheat"
],[
"$",
"$$",
"$$$",
"$$$$"
]];
var app = angular.module('foodcheezus', []).
controller('preferences', function($scope, $http, $location) {
  console.log($location.path());
  $scope.userPreferences = {
    "cuisines":[],
    "allergies":[],
    "prices": [],
    "name": "",
    "roomNumber": $('body').data('id')
  };
  console.log($scope.userPreferences);
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
      /*
      $http.post('/postTest', $scope.userPreferences).
      success(function(data, status, headers, config) {
        console.log(data);
    }).
      error(function(data, status, headers, config) {
        console.log(data);
      });
      }
*/

      $.ajax({
          url: '/rooms/' + $('body').data('id'),
          type: "POST",
          data: $scope.userPreferences,
          dataType: "json",
          success: function(response) {
            window.location.href = "/rooms/"+$scope.userPreferences.roomNumber + "/info";
          }
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

app.controller('start', function($scope, $http, $window){
  $scope.groupCreated = false;
  $scope.groupNumber = 0;
  $scope.makeRoom = function(){
    console.log("POSTING STUFF");
    console.log($scope.groupName);
          $http.post('/rooms', {"groupName":$scope.groupName}).
      success(function(data, status, headers, config) {
        console.log(data);
        $scope.groupCreated = true;
        $scope.groupNumber = Math.round(data.roomNumber).toString()
        $scope.message = "Your group number is " + $scope.groupNumber +
        ". Share this number with your friends!";

    }).
      error(function(data, status, headers, config) {
        console.log(data);
      });
  }
  $scope.getStarted = function(){
    $window.location.href = "/rooms/"+$scope.groupNumber;
  }
})