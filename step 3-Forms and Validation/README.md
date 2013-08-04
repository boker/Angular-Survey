##Step 3: Forms and Validation
In this phase we are going to implement the functionality of editing a selected survey. This will include validations as well. For the sake of covering wide enough range of scenarios, we've included 2 more properties as part of the survey object, a category and number of participants.
A few other changes, which are not core, are that we've moved the surveys collection into a different file, so as not to distract.
Time to dive in

* Form
        <form name="surveyForm" ng-submit="save()"> :

First thing you'll notice is that we've put all our fields inside a form. This triggers angular's inbuilt ng-form directive. This defines a model with the same name as form on the scope.
Form is specially required for angular's built in validation to work.
Specifying the ng-submit directive, suppresses the normal form submission and gives angular a chance to evaluate the expression specified. In this case the save function defined on the scope in the controller gets called.


* Input Types and Validation

        <input type="text" name="surveyName" ng-model="survey.name" required="true" ng-Maxlength="20"
        autofocus class="span4" id="surveyName"/>
    
Also notice how we've given a name to the input field above. Doing this defines a property on the surveyForm model that angular generated previously.
It is very important to understand that this property doesn't contain the value of the input field. 
But since this is defined against the scope, it is availabe elsewhere within the form as well as inside the controller on the scope.

The model, "surveyForm.surveyName" in this case, is an object with special properties defined by angular. A few of these are as below:
    1. $invalid - This is true, if the user input doesn't meet any of the validation requirements... for example the field is require, but the user has not entered any value.
    2. $valid - This is true, if all the validation requirements pass.
    3. $error: {required:false} - In case any validations fail, this object contains a property for each of the validation failures. Each validation requirement is identified by a key.. such as "required", "maxlength" etc.
       for a detailed version of out of the box validation attributes, refer to http://docs.angularjs.org/api/ng.directive:input

ng-model - The directive ng-model sets up a 2-way binding mechanism between the value of the element and the model specified by the expression... "survey.name" in this case. The values of the model and the input field are kept synchronised by angular. So as the user types in, the value of the corresponding model changes automatically by angular magic.

We have also specified that the field is a required field and the the maximum lenght of this field is 20 characters... by using the ng-Maxlength attribute.

* Validation error messages

        <span ng-show="surveyForm.surveyName.$invalid" class="help-inline">
        Survey name is required and must be less than 20 characters.
        </span>
        
Above is just one of the ways of showing validation error messages.
(ng-show="surveyForm.surveyName.$invalid") - This directive hides the element by default and displays it only if the specified expression is true. From previos discussion, "surveyForm.surveyName.$invalid" is true, if any of the validation requirements on "surveyForm.surveyName" field fails... .in which case the message within the span becomes visible.

Remember that the model "surveyForm.surveyName" is available on the scope as well. So another way could be to check these in the "save" function and respond to the user submit action, based on whether all the fields have met their validation requirements.

* ng-options

        <select name="category" id="category" ng-model="survey.categoryid" 
        ng-options="category.id as category.name for category in categories" required>

Here I will use the angular documentation:
    ngOptions attribute can be used to dynamically generate a list of <option> elements for a <select> element using an array or an object obtained by evaluating the ngOptions expression.
    When an item in the <select> menu is selected, the value of array element or object property represented by the selected option will be bound to the model identified by the ngModel directive of the parent select element.
    
There are many different forms of expressions that we can specify for the ng-options to evaluate. For details please refer to the angular documentation at http://docs.angularjs.org/api/ng.directive:select
In our case we are using the expression form - "select as label for value in array".. where "select" becomes the value of each option, the "label" becomes what is displayed and the value is the object in each iteration.

* ng-pattern
This is a way to specify the pattern that must match the user input for the value to be considered valid for the input field.  

        <input type="text" id="numberOfParticipants" name="numberOfParticipants" class="span4" 
        ng-model="survey.numberOfParticpants" ng-Maxlength="5" ng-pattern="/^\d{0,9}$/" autofocus/>
        
Although we could have used "<input type="number".../>, we've used ng-pattern to restrict the user input to numbers for demonstration purposes.

* ng-disabled
        <input class="btn btn-primary" type="submit" value="Save" ng-disabled="surveyForm.$invalid"/>

In the above line we are disabling the submit button if any of the form fields are invalid.

* app.js - SurveyController

        myApp.controller('SurveyController',['$scope','$routeParams','$location', 
                                                function($scope, $routeParams, $location){
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

You'll notice that we are creating a copy of the survey object to be edited. This is because since we are binding the survey object, if this happens to be the original object, we would have no way to throw away the changes made by the user, if we want to cancel edit.
The save function is called, when the form is submitted, in which case we copy the contents of the $scope.survey into the original survey object. Of course in real life, we will call some server side service to persist the changes. We'll take a look at that in a later step.

Notice also that we are asking the angular to supply the $location service to the controller.
We then use this service to direct the user back to the list of surveys.
