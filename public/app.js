//module
var weatherApp = angular.module('weatherApp',['ngRoute', 'ngResource']);

//routes
weatherApp.config(function($routeProvider) {
	$routeProvider

	.when('/', {
		templateUrl: 'pages/home.html',
		controller: 'homeController'
	})

	.when('/forecast', {
		templateUrl: 'pages/forecast.html',
		controller: 'forecastController'
	})

	.when('/forecast/:days', {
		templateUrl: 'pages/forecast.html',
		controller: 'forecastController'		
	})
})

//services
weatherApp.service('cityService', function() {
	this.city = 'New York, NY'
})
//controllers
weatherApp.controller('homeController', ['$scope','cityService', function($scope,cityService) {
	$scope.city = cityService.city;

	$scope.$watch('city', function() {
		cityService.city = $scope.city;
	})

}]);

weatherApp.controller('forecastController', ['$scope','cityService', '$http', '$routeParams', 
	function($scope,cityService,$http,$routeParams) {

		$scope.city = cityService.city;

		$scope.days = $routeParams.days || '3' ;

		$scope.weatherApi = 
			$http.get('http://api.openweathermap.org/data/2.5/forecast?q='+ $scope.city 
				+ '&cnt=' + $scope.days + '&appid=bf14df85554c138a1ee1ea80d096767a')
			.then(function(response){
				$scope.city = response.data
			    console.log($scope.city)
			});

		$scope.convertTemp = function(degK) {
			return Math.round((1.8 * (degK - 273))+ 32);
		}



}]);