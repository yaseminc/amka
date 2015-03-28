'use strict';

//Setting up route
angular.module('race-results').config(['$stateProvider',
	function($stateProvider) {
		// Race results state routing
		$stateProvider.
		state('listRaceResults', {
			url: '/race-results',
			templateUrl: 'modules/race-results/views/list-race-results.client.view.html'
		}).
		state('createRaceResult', {
			url: '/race-results/create',
			templateUrl: 'modules/race-results/views/create-race-result.client.view.html'
		}).
		state('viewRaceResult', {
			url: '/race-results/:raceResultId',
			templateUrl: 'modules/race-results/views/view-race-result.client.view.html'
		}).
		state('editRaceResult', {
			url: '/race-results/:raceResultId/edit',
			templateUrl: 'modules/race-results/views/edit-race-result.client.view.html'
		});
	}
]);