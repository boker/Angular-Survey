##Step 2: Module and Routing 

* Module:
Think of module as a grouping of closely related functions together. In a typical single page application, you would have a single module. If you are developing a reusable component, you might wrap all th ecode related to that module into a single module.
You are though free to define multiple modules in a SPA.. for more info refer to http://docs.angularjs.org/guide/module.
Following are the changes that we have done in our application to use module, followed by explaination of the same.

1.
javascript:

    var myApp = angular.module('myApp', []);

The code above creates a module identified by "myApp" and is assigned to a variable myApp.

html:

    <html class="no-js" ng-app="myApp">

In the html, we have specified that the main module of the application is the "myApp" module. Now when angular tries to find the controllers etc. that you code needs, it will look at the controller functions in this module, and if not found, then at the global scope.

2.
javascript:

    myApp.controller('SurveyListcontroller', ['$scope', function ($scope) {
          $scope.surveys = [
    	      {id:1, name:"survey1", description:"survey description 1"},
    	      {id:2, name:"survey 2", description:"survey description 2"}
    	    ];
    
    	    $scope.delete = function(index){
    	      $scope.surveys.splice(index,1);
    	    }
    }]);

We have removed the definition of the controller function from the global scope and defined it as part of the main module.
We could have defined the above in a slightly simpler syntax like... "myApp.controller('SurveyListcontroller', function ($scope) {", but the above approach is recommended, because imnification will maintain the references.
So basically the first parameter is the name of the controiller that you are registering.
The second parameter is an array, where the last parameter is the controller function itself.
In between the first and the last parameters are the names of the parameters/services that are expected by the controller. Angular injects the appropriate instance of the service into the parameter at run time. We'll cover more of this later. For now understand that the names of the parameters are of value and not the order of their declaration.

* Routing and Partial Templates
