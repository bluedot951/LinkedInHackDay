angular.module('starter.controllers', [])

.controller('HomeController', function($scope, $http, $rootScope, $state) {

	$scope.loc = "";

    // categories are actually categories!
    $scope.category = {};
    $scope.categories = [{
        name: 'Museum'},
        {name: 'Science'},
        {name: 'Night Life'},
        {name: 'Art'},
        {name: 'History'},
        {name: 'Theater'},
        {name: 'Sports'},
        {name: 'Nature'},
        {name: 'Entertainment'}];

    $scope.distances = [10, 20, 30, 40, 50];

	$scope.data = "";

	$scope.recommend = function() {
		// console.log(loc);
		//console.log($scope.category.selected.name)
		console.log($scope.loc);

		if ($scope.loc == "") return;

		var long;
		var lat;

		$http.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + $scope.loc + "&key=AIzaSyAqFzn85y_cm_0TKrGInkjVOEj_IgMyAFE")
		.then(function successCallback(response) {
			long = response.data.results[0].geometry.viewport.northeast.lng;
			lat = response.data.results[0].geometry.viewport.northeast.lat;
			console.log(long);
			console.log(lat);

			console.log($scope.distances.selected);

			var url = "http://placesrec.herokuapp.com/searchPlaces?lat=" + lat + "&long=" + long + "&dist=" + $scope.distances.selected / 100 + "&sort=relevance/";
			console.log(url);

			$http.get(url)
			.then(function successCallback(response) {
				$scope.data = response.data;
				$rootScope.data = response.data;
				console.log(response.data);
				console.log("ROOTSCOPE DATA FROM HOME");
				console.log($rootScope.data);
                $state.go('result');
			}, function errorCallback(response) {
				console.log(response)
			})

		}, function errorCallback(response) {
			console.log("error occured");
		});
	};
})
.controller('MapCtrl', function($scope) {
  /*var latLng = new google.maps.LatLng(-34, 151);
 
    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);*/

    $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
})
.controller('RecommendationCtrl', function($scope, $ionicModal, $rootScope, $state, $http) {

		$scope.categories = [{
        name: 'Museum'},
        {name: 'Science'},
        {name: 'Night Life'},
        {name: 'Art'},
        {name: 'History'},
        {name: 'Theater'},
        {name: 'Sports'},
        {name: 'Nature'},
        {name: 'Entertainment'}];


    $scope.result = $rootScope.data;
    if ($scope.result) {
        for ( i= 0; i < $scope.result.length; i++) {
            $scope.result[i].latitude = $scope.result[i].location.lat;
            $scope.result[i].longitude = $scope.result[i].location.long;
            $scope.result[i].id = i;
            $scope.result[i].icon = 'img/map.ico';
        }
    }

    $scope.home = function() {
        $state.go('home');
    };

    if ($scope.result && $scope.result.length > 0) {
        $scope.map = { center: { latitude: $scope.result[0].location.lat, longitude: $scope.result[0].location.long }, zoom: 8 };
        console.log("MAP SET TO : " + $scope.map);
    } else {
        $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
        console.log("MAP SET TO : ");
        console.log($scope.map);
    }

    $ionicModal.fromTemplateUrl('templates/modal.html', {
        scope: $scope

    }).then(function(modal) {
        $scope.modal = modal;
    });
  
    $scope.addRecommendation = function(reco) {
        console.log(reco.name);
        console.log(reco.location);
        console.log(reco.category);
        $scope.modal.hide();

        var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + reco.location + "&key=AIzaSyAqFzn85y_cm_0TKrGInkjVOEj_IgMyAFE";
        console.log("QUERYING URL : " + url);

        $http.get(url)
		.then(function successCallback(response) {
			long = response.data.results[0].geometry.viewport.northeast.lng;
			lat = response.data.results[0].geometry.viewport.northeast.lat;
			console.log(long);
			console.log(lat);

			var url = "http://placesrec.herokuapp.com/addPlace?name=" + reco.name + "&lat=" + lat + "&long=" + long + "&category=" + reco.category;
			console.log(url);

			$http.get(url)
			.then(function successCallback(response) {
				console.log(response.data);
			}, function errorCallback(response) {
				console.log(response)
			})

		}, function errorCallback(response) {
			console.log("error occured");
		});


    };
});
