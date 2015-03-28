'use strict';

//Race results service used to communicate Race results REST endpoints
angular.module('race-results').factory('RaceResults', ['$resource',
	function($resource) {
		return $resource('race-results/:raceResultId', { raceResultId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);