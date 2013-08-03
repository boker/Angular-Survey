##Step 2:

* The first thing that has been done to make angular aware of this single page application is to specify an attribute of ng-app. The angular.js file is included in the index.html file. Once the html page loads, angular bootstraps itself on finding that ng-app.
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


  All the ng-*s that you see in the html markup are somethimg called directives. To quote angular documention - "A directive is a behavior or DOM transformation which is triggered by the presence of a custom attribute, element name, class name or comment. A directive allows you to extend the HTML vocabulary in a declarative fashion.". You can define your own directives but more on that later.
  Below are the directives used in the code snippet above, along with a description of what they do.

  1. ng-controller="surveyListcontroller" : 
  This is a directive that allows up the wiring of a code behind function to the section of html section to which the controller applies. 
  The controller function, "surveyListcontroller" in this case, is responsible for exposing the model and callbacks to the html via a $scope object passed to it by the angular framework.
  All the functions and data defined on the $scope object inside the controller is available to the section of html covered by the controller. Controllers can be nested... but more on that later.
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
  
  5. ng-href : 
  6. ng-click="delete($index)" :
  
