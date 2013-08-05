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
