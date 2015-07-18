var questions = [
"Pick your favorite cuisines.",
"Do you have any allergies?",
"What's your price preference?"


];
var app = angular.module('foodcheezus', []).
controller('preferences', function($scope) {
  $scope.counter = 0;
  $scope.question = questions[$scope.counter]
  $scope.next = function(){
    if ($scope.counter == questions.length-1){

    }
    else {
      $scope.counter++;
      $scope.question = questions[$scope.counter];
    }
  }
  $scope.messages = "MESSAGES NOW";
});