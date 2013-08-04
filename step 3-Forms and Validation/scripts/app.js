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
	    $scope.surveys = surveys;

	    $scope.delete = function(index){
	      $scope.surveys.splice(index,1);
	    }
}]);

myApp.controller('SurveyController',['$scope','$routeParams','$location', function($scope, $routeParams, $location){
	var surveyId = +$routeParams.id ;
	
	$scope.categories = [
		{id:1, name:"eMail Based"},
		{id:2, name:"Online"},
		{id:3, name:"SMS Based"}
	];

	var survey = _.find(surveys, { 'id': surveyId });
	$scope.survey = angular.copy(survey);

	$scope.save = function(){
		$scope.survey = angular.copy($scope.survey, survey);
		$location.path('/surveys');
	}

	$scope.cancel = function(){
		$location.path('/surveys');
	}
}])
