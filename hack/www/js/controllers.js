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
})
.controller('MapCtrl', function($scope) {
  var latLng = new google.maps.LatLng(-34, 151);
 
    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
})
.controller('RecommendationCtrl', function($scope, $ionicModal) {
    $scope.result = [{
        name: 'Temple',
        category: 'Nightclub',
        img: 'img/adam.jpg'
    },
    {
        name: 'DNA Lounge',
        category: 'Nightclub',
        img: 'img/ben.png'
    }];

    $ionicModal.fromTemplateUrl('templates/modal.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });
  
    $scope.addRecommendation = function(reco) {        
        console.log(reco.location);
        console.log(reco.category);
    };
});
