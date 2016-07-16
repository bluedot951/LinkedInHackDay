angular.module('starter.controllers', [])

.controller('HomeController', function($scope) {

  $scope.category = {
    'c1': false,
    'c2': false,
    'c3': false
  };

  $scope.recommend = function() {
    if ($scope.location == "") return;
  } 
});
