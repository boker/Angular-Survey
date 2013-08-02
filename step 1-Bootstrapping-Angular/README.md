##Step 2:

* The first thing that has been done to make angular aware of this single page application is to specify an attribute of ng-app. The angular.js file is included in the index.html file. Once the html page loads, angular bootstraps itself on finding that ng-app.
  There are other ways to bootstrap the angular application, which we'll take a look at later on.
* The second set of changes that are angular related are highlighted below. The explanation follows after that.

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

  All the ng-*s that you see in the html markup is somethimg called directives. To quote angular documention - "A directive is a behavior or DOM transformation which is triggered by the presence of a custom attribute, element name, class name or comment. A directive allows you to extend the HTML vocabulary in a declarative fashion.". Below are a few commonly used directives along with a description of what they do.

  1. ng-controller="surveyListcontroller" :
  2. ng-repeat="survey in surveys" :
  3. ng-class-even="'success'" :
  4. {{}} :
  5. ng-href : 
  6. ng-click :
  
