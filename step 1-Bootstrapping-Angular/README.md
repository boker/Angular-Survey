##Step 1:

* The first thing that has been done to make angular aware of this single page application is to specify an attribute of ng-app. The angular.js file is included in the index.html file. Once the html page loads, angular bootstraps itself on finding that ng-app.
  
        <html class="no-js" ng-app>

  There are other ways to bootstrap the angular application, which we'll take a look at later on.
* The second set of changes that are angular related are highlighted below. The explanation follows after that.
index.html snippet.

        <div class="container" ng-controller="surveyListcontroller">
            <button class="btn btn-primary">New</button>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr ng-repeat="survey in surveys" ng-class-even="'success'">
                        <td>{{survey.name}}</td>
                        <td>{{survey.description}}</td>
                        <td><a ng-href="#/survey/{{survey.id}}">Edit</a><div class="span1"> </span><a ng-href="#" ng-click="delete($index)">Delete</a></td>
                    </tr>
                </tbody>
            </table>
        </div>

app.js snippet

        var surveyListcontroller = function($scope){
            $scope.surveys = [
              {id:1, name:"survey1", description:"survey description 1"},
              {id:2, name:"survey 2", description:"survey description 2"}
            ];

            $scope.delete = function(index){
              $scope.surveys.splice(index,1);
            }
        }


  All the ng-*s that you see in the html markup are something called directives. To quote angular documention - "A directive is a behavior or DOM transformation which is triggered by the presence of a custom attribute, element name, class name or comment. A directive allows you to extend the HTML vocabulary in a declarative fashion.". You can define your own directives but more on that later.
  Below are the directives used in the code snippet above, along with a description of what they do.

  1. ng-controller="surveyListcontroller" : 
  This directive is used to wire up a code behind function to the section of html associated with this controller.
  The controller function, "surveyListcontroller" in this case, is responsible for exposing the model and callbacks to the html via a $scope object passed to it by the angular framework.
  All the functions and data defined on the $scope object inside the controller is available to the section of html covered by the controller. Controllers can be nested... we'll cover this later.
  In our controller, we have defined a property called "surveys" and a function called "delete". Let's see, how these are used below.

  2. ng-repeat="survey in surveys" :
  This is a directive using which we can repeat a the portion of html contained within the directive, including the element on which it is declared. The content within "..." is an agular expression. This is evaluated in the context of the scope associated with this directive.
  In our case surveys is an array defined in the scope associated with the controller "surveyListcontroller". So ng-repeat will repeat the set of elements within "tr", including itself. For each repeat, it creates a separate scope and defines a property called "survey" on that scope. This scope is then available to the rest of the html section within it.
  The above scope also defines a the following special properties:
      - $index -  iterator offset of the repeated element (0..length-1)
      - $first - true if the repeated element is first in the iterator.
      - $last - true if the repeated element is last in the iterator.
      - $middle - true if the repeated element is between the first and last in the iterator.

  3. ng-class-even="'success'" :
  This directive works in conjuntion with the ng-repeat directive. It applies the mentioned class "success" if the position of element in the array is even. The "success" class is defined as part of the twitter bootstrap css file.

  4. {{}} :
  The above is a directive that can contain any angular expression... meaning that whatever you write in here is evalauted against the current effective scope. So if we write {{survey.name}}, in this case remember that the scope defined by ng-repeat is in effect and that it has a property "survey" defined against this scope which points to the current element of the array.
  So survey.name is evaluates to the current survey objects name.

  5. ng-href="#/survey/{{survey.id}}" : We could've written href="#/survey/{{survey.id}}", and it would work fine, except that in a big page, the literal "{{survey.id}}" would be outout as it is till the time, angular got a chance to evaluate it... and hence if the user happens to click this before angular does something about it, the user would be taken to the invalid page - ...index.html#/survey/{{survey.id}}
  So when we use ng-href... nothing gets outputted till angular processes this directive.. and when it does you get the value of "survey.id" replaces as part of the url and then the user will be directed to the correct url as intended.
    

  6. ng-click="delete($index)" :
  This directive evaluates the specified expression, when the user clicks the element on which this directive is mentioned. In this case the expression happens to be a call to a function that has ben defined in the scope of the controller.
  You'll notice that we are passing "$index" as a parameter to the delete function call. Remeber that $index within a ng-repeat section, represents the index of the current element in the array. If you look in the delete function, we are simply removing that element from the array.
  When this happens, ng-repeat refreshes the list of surveys displayed to the user.
  How did this happen? You see when you define anything as part of the scope, angular watches it and notifies all the affected parties of when that value changes. This is putting it very simply, actually there are a lot more things going under the hood... but more on that some other time.
  
