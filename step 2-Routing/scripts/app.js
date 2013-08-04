'use strict';

var myApp = angular.module('myApp', []);

myApp.config(['$routeProvider',function ($routeProvider){
	$routeProvider
		.when('/surveys', {
			templateUrl: 'views/SurveyList.html',
			controller: 'SurveyListcontroller'
		})
		.when('/survey/:id',{
			templateUrl: 'views/Survey.html',
			controller: 'SurveyController'
		})
		.otherwise({
			redirectTo: '/surveys'
		});
}]);


myApp.controller('SurveyListcontroller', ['$scope', function ($scope) {
	    $scope.surveys = [
	      {id:1, name:"survey1", description:"survey description 1"},
	      {id:2, name:"survey 2", description:"survey description 2"}
	    ];

	    $scope.delete = function(index){
	      $scope.surveys.splice(index,1);
	    }
}]);

myApp.controller('SurveyController',['$scope','$routeParams', function($scope, $routeParams){
	$scope.surveyId = $routeParams.id;	
}])