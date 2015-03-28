'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var raceResults = require('../../app/controllers/race-results.server.controller');

	// Race results Routes
	app.route('/race-results')
		.get(raceResults.list)
		.post(users.requiresLogin, raceResults.create);

	app.route('/race-results/:raceResultId')
		.get(raceResults.read)
		.put(users.requiresLogin, raceResults.hasAuthorization, raceResults.update)
		.delete(users.requiresLogin, raceResults.hasAuthorization, raceResults.delete);

	// Finish by binding the Race result middleware
	app.param('raceResultId', raceResults.raceResultByID);
};
