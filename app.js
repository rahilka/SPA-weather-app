//MODULE
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

//Setup routes for the view and controller
//routes
weatherApp.config(function ($routeProvider) {

  $routeProvider

  .when('/', {
    templateUrl: 'pages/home.htm',
    controller: 'homeController'
  })

  .when('/forecast', {
    templateUrl: 'pages/forecast.htm',
    controller: 'forecastController'
  })
});

//SERVICES

weatherApp.service('cityService', function() {
  this.cityId = 524901;
});

//CONTROLLERS
weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService) {
  $scope.cityId = cityService.cityId;

  $scope.$watch('city', function() {
    cityService.cityId = $scope.cityId;
  });
}]);

weatherApp.controller('forecastController', ['$scope', '$resource', 'cityService',
function($scope, $resource, cityService) {

  $scope.cityId = cityService.cityId;

  $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast", {
    callback: "JSON_CALLBACK"}, {get: {method: "JSONP"}});

    $scope.weatherResult = $scope.weatherAPI.get({ id: $scope.cityId });

    console.log($scope);
}]);
