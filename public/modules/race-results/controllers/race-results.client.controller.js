'use strict';

// Race results controller
angular.module('race-results').controller('RaceResultsController', ['$scope', '$stateParams', '$location', 'Authentication', 'RaceResults',
	function($scope, $stateParams, $location, Authentication, RaceResults) {
		$scope.authentication = Authentication;

		// Create new Race result
		$scope.create = function() {
			// Create new Race result object
			var raceResult = new RaceResults ({
				name: this.name
			});

			// Redirect after save
			raceResult.$save(function(response) {
				$location.path('race-results/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Race result
		$scope.remove = function(raceResult) {
			if ( raceResult ) { 
				raceResult.$remove();

				for (var i in $scope.raceResults) {
					if ($scope.raceResults [i] === raceResult) {
						$scope.raceResults.splice(i, 1);
					}
				}
			} else {
				$scope.raceResult.$remove(function() {
					$location.path('race-results');
				});
			}
		};

		// Update existing Race result
		$scope.update = function() {
			var raceResult = $scope.raceResult;

			raceResult.$update(function() {
				$location.path('race-results/' + raceResult._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Race results
		$scope.find = function() {
			$scope.raceResults = RaceResults.query();
		};

		// Find existing Race result
		$scope.findOne = function() {
			$scope.raceResult = RaceResults.get({ 
				raceResultId: $stateParams.raceResultId
			});
		};
	}
]);