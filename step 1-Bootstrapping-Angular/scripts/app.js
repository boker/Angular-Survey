'use strict';

var surveyListcontroller = function($scope){
    $scope.surveys = [
      {id:1, name:"survey1", description:"survey description 1"},
      {id:2, name:"survey 2", description:"survey description 2"}
    ];

    $scope.delete = function(index){
      $scope.surveys.splice(index,1);
    }
}
