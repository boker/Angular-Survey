##Step 2: Module and Routing 
In this step, we have provided the behavior to show the individual survey when user clicks on the appropriate edit link and how routing helps us do that.

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
We could have defined the above in a slightly simpler syntax like... "myApp.controller('SurveyListcontroller', function ($scope) {", but the above approach is recommended, because then minification will maintain the reference between the parameter and the service names required appropriately.
So basically the first parameter is the name of the controiller that you are registering.
The second parameter is an array, where the last parameter is the controller function itself.
In between the first and the last parameters are the names of the parameters/services that are expected by the controller. Angular injects the appropriate instance of the service into the parameter at run time. We'll cover more of this later. For now understand that the names of the parameters are of importance and not the order of their declaration.

* Routing and Partial Templates
In the previous step, the entire html content was in a single file. But we need to change the content of the depending on the menu selection as well as when the user clicks to edit a particular survey, we'd want to take him to a survey edit page.

Welcome to routing. The following are what we've done to show the user different content, depneding on the url.

1. Index.html

        <div ng-view/>

We've replaced the entire content of the survey list with the above. The directive ng-view works with conjunction with the routing service explained further down. It provides a place holder where the actual content would be rendered depending on the url.

2. views/SurveyList.html
This contains the html content of the survey list yanked out of the index.html file.

3. views/survey.html
This contains the html content to show the details of the selected survey, given it's Id. Right now it contains only some dummy text for dummy purposes.

4. app.js

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

This is the real juice. 
We define routing within the application configuration, by calling myApp.config function. 
Like everywhere else, we specify that our configuration handler function expects a service by the name of $routeProvider. This is a service provided by Angular. 
Next we define routes by calling the "when" functions of the $routeProvider.

This function accepts 2 parameters... the path and the route. The path is a relative path to the index.html page in the form of "index.html/#/<path>" . 
The second parameter is an object with various properties. We are using 2 of them, the templateUrl and controller. The templateUrl specifies the partial html page that needs to be rendered at the position of ng-view.
The controller specifies the controller function that is to be associated with the root of the html partial page. This is optional and you are free to specify the controller as part of the html itself.
For all the options availabe, refer to http://docs.angularjs.org/api/ng.$routeProvider.
At the end, we specify the default route to apply, in case the user hasn't typed in anything after index.html in the URL.

Also note the following the following:
"'/survey/:id'" in the above code and code "$scope.surveyId = $routeParams.id;" in the "SurveyController".
When the url is of the form index.html/survey/1, then the value of "Id" can be accessed via the $routeParams service from within the SurveyController.
Try clicking on the eidt link of any of the surveys to see the routing in action.


Note that the partial template page is cached by angular and hence multiple server trips to the same partial page is prevented.





