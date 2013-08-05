##Step 4: Promises and Services

Now things begin to get interesting... so get a cup of coffee and tighten your seatbelts. We are starting to get into slighlty more complicated details of angular, but the rewards of understanding this are immense.

Before we begin, note that we've moved the controller code into a separate file under scripts/controllers folder.
We've also moved the surveys jason data into a separate file - scripts/data/surveys.json file.
We've created a new js file for service related code under scripts/services folder.

* Services
In the previos step, all of th logic of getting the surveys data etc. was done inside the controller itself. This violates the Single Responsibility Principle. Also if we wanted to resue the logic of getting a single survey from multiple different places in the application, we'd have to repeat that logic and thus violating the DRY principle.
Also (although we're not covering it), having the code to get the list of surveys, from some server in real life, makes the controller not unit-testatble.

For all of the above reasons, we refactor the code to get various survey details, into a separate service called "surveys".
The service has been defined as follows:

		myApp.service('surveys',[ '$http','$q', function($http, $q){
				this.get = function(){
					return $http.get('scripts/data/surveys.json')
						.then(function(response){
							return response.data;
						});
				};

				this.getById = function(id){
					var deferred = $q.defer();
					$http.get('scripts/data/surveys.json')
						.success(function(surveys){
							var survey = _.find(surveys, {id: id});
							deferred.resolve(survey);
					});
					return deferred.promise;
				};

				this.save = function(changedsurvey){
					// This is not implemented and would typically be a $http.put/post call to server to save the changes
				};
			}
		]);

Note the following as far as the service declaration is concerned:
	1. We call the .service function and the first parameter is the name of the service.
	2. The second parameter is an array, whose last element is the function, which in turn returns the service.. in 	this case it returns itself, since we have not defined any return value explicitly.
	3. All the elements in the array, previous to the function, lists the dependencies of the service that we are 		implementing. Angular injects the dependent services at runtime. Isn't it cool? So at runtime, angular will 	provide us the instances of the $http and $q inbuilt services.
	4. We have defines 2 functions "get" and "getById", that return a list of surveys and a single survey for a given 	id.
	5. Note how we have defined the "SurveyListController" to be dependent on the "surveys" service.

			myApp.controller('SurveyListcontroller', ['$scope', 'surveys', function ($scope, surveys) {

		When the controller method is executed by the angular runtime, an instance of "surveys" service, registered on it, gets injected into the controller method.
		Note that a service is singleton, so only one instance of a given service is created for a lifetime of the application.
		This makes is possible for multiple controllers to share data via a given service.

#####Now lets look at the implementation of the methods of the service and how they are consumed within the controllers

*	$q service
$q is an angular in-built service that implements the concept of promise. Let's understand promise in general in brief and the problem that it solves for asynchronous programming.

Let's say we want to make a service call to get a particular survey and then we want to get the category name for that survey. (in real life, this would not be an optimized way to doing things.. but let's understand for the sake of it).
Since http calls are aynchronous, we would have to write something like this

	MakehttpCall("survey/1", function(survey){
			MakeNextHttpCall("category/"+ survey.categoryId, function(category){
					// do what you want to do with category
				})
		})

The above looks pretty unreadable and if we take this a few steps further.. say we want to make another async call when we get the category, then we can imagine the mess.
To solve the above, promises provide a neater interface, that allows you to chain mutiple async processing requests, without the need to keep on nesting. Like so:

	promisedObject
	.then(do the processing and return if you have to)
	.then(do another async process with the value returned in the previous step)

There are multiple different implementations of the promise concept by different libaries inlcuding JQuery.

Let's understand promises from angular perspective. (recommend reading detailed explaination at http://docs.angularjs.org/api/ng.$q).

		this.getById = function(id){
			var deferred = $q.defer();
			$http.get('scripts/data/surveys.json')
				.success(function(surveys){
					var survey = _.find(surveys, {id: id});
					deferred.resolve(survey);
			});
			return deferred.promise;
		};

The first that we do is create a deferred object by calling $q.defer().
Next we do our asyncronous processing and call the resolve method on the deferred object, when we have the result of our asynchronous processing.
We return a promise to the user. A promise to the user tells him that the user will be notified of the result at some in time.
Angular promises are special, since the html views recongnose them. Let's look at the corresponding controller code to understand this more.

		$scope.survey = surveys.getById(surveyId);

Here we are simply asigning the returned promise to the $scope.survey variable. In the survey.html, we are simply binging to this object. When the returned promise resolves, angular automatically updates the view accordingly. We do not need to write the "then syntax" and then update the $scope.survey object inside it like so:

		surveys.getById(surveyId)
			.then(function(response){
				$scope.survey = response.data;
			})

But the above method could've been used, if we wanted to do some non view related processing on getting the actual survey.

* $http service

Refer to the service code below:

		this.get = function(){
			return $http.get('scripts/data/surveys.json')
				.then(function(response){
					return response.data;
				});
		};


And the controller code below:

		$scope.surveys = surveys.get();

The service methid returns the $http.get method. This is a promise itself, that resolves to the return value inside the get method.. i.e. it resolves to response.data value, when it's available.
Hence in the controller, $scope.surveys gets the list of surveys at a later point of time, and the view gets updated automatically at that time.

The service also exposes a save method, which doesn't contain any implementation, since we have not implemented any server side code. Typically it would involve a call to a server  to actually save the changes using $http.post method.

Once again I recommend reading through the following for detailed explainations and options avialable for $q and $http:
http://docs.angularjs.org/api/ng.$http
http://docs.angularjs.org/api/ng.$q

Happy reading!