angular.module('starter.controllers', [])

.controller('HomeController', function($scope, $http) {

	// $scope.category = {
	// 	'c1': false,
	// 	'c2': false,
	// 	'c3': false
	// };

	$scope.loc = "abc";
	$scope.category = "history";

	$scope.data = "";

	$scope.recommend = function() {
		// console.log(loc);
		console.log($scope.category)
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

			var url = "http://placesrec.herokuapp.com/searchPlaces?lat=" + lat + "&long=" + long + "&category=" + $scope.category + "&dist=9999999&sort=relevance/";
			console.log(url);

			$http.get(url)
			.then(function successCallback(response) {
				$scope.data = response.data;
				console.log(response.data);
			}, function errorCallback(response) {
				console.log(response)
			})

		}, function errorCallback(response) {
			console.log("error occured");
		});
	} 

});
