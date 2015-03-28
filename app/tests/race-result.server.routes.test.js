'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	RaceResult = mongoose.model('RaceResult'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, raceResult;

/**
 * Race result routes tests
 */
describe('Race result CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Race result
		user.save(function() {
			raceResult = {
				name: 'Race result Name'
			};

			done();
		});
	});

	it('should be able to save Race result instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Race result
				agent.post('/race-results')
					.send(raceResult)
					.expect(200)
					.end(function(raceResultSaveErr, raceResultSaveRes) {
						// Handle Race result save error
						if (raceResultSaveErr) done(raceResultSaveErr);

						// Get a list of Race results
						agent.get('/race-results')
							.end(function(raceResultsGetErr, raceResultsGetRes) {
								// Handle Race result save error
								if (raceResultsGetErr) done(raceResultsGetErr);

								// Get Race results list
								var raceResults = raceResultsGetRes.body;

								// Set assertions
								(raceResults[0].user._id).should.equal(userId);
								(raceResults[0].name).should.match('Race result Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Race result instance if not logged in', function(done) {
		agent.post('/race-results')
			.send(raceResult)
			.expect(401)
			.end(function(raceResultSaveErr, raceResultSaveRes) {
				// Call the assertion callback
				done(raceResultSaveErr);
			});
	});

	it('should not be able to save Race result instance if no name is provided', function(done) {
		// Invalidate name field
		raceResult.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Race result
				agent.post('/race-results')
					.send(raceResult)
					.expect(400)
					.end(function(raceResultSaveErr, raceResultSaveRes) {
						// Set message assertion
						(raceResultSaveRes.body.message).should.match('Please fill Race result name');
						
						// Handle Race result save error
						done(raceResultSaveErr);
					});
			});
	});

	it('should be able to update Race result instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Race result
				agent.post('/race-results')
					.send(raceResult)
					.expect(200)
					.end(function(raceResultSaveErr, raceResultSaveRes) {
						// Handle Race result save error
						if (raceResultSaveErr) done(raceResultSaveErr);

						// Update Race result name
						raceResult.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Race result
						agent.put('/race-results/' + raceResultSaveRes.body._id)
							.send(raceResult)
							.expect(200)
							.end(function(raceResultUpdateErr, raceResultUpdateRes) {
								// Handle Race result update error
								if (raceResultUpdateErr) done(raceResultUpdateErr);

								// Set assertions
								(raceResultUpdateRes.body._id).should.equal(raceResultSaveRes.body._id);
								(raceResultUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Race results if not signed in', function(done) {
		// Create new Race result model instance
		var raceResultObj = new RaceResult(raceResult);

		// Save the Race result
		raceResultObj.save(function() {
			// Request Race results
			request(app).get('/race-results')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Race result if not signed in', function(done) {
		// Create new Race result model instance
		var raceResultObj = new RaceResult(raceResult);

		// Save the Race result
		raceResultObj.save(function() {
			request(app).get('/race-results/' + raceResultObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', raceResult.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Race result instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Race result
				agent.post('/race-results')
					.send(raceResult)
					.expect(200)
					.end(function(raceResultSaveErr, raceResultSaveRes) {
						// Handle Race result save error
						if (raceResultSaveErr) done(raceResultSaveErr);

						// Delete existing Race result
						agent.delete('/race-results/' + raceResultSaveRes.body._id)
							.send(raceResult)
							.expect(200)
							.end(function(raceResultDeleteErr, raceResultDeleteRes) {
								// Handle Race result error error
								if (raceResultDeleteErr) done(raceResultDeleteErr);

								// Set assertions
								(raceResultDeleteRes.body._id).should.equal(raceResultSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Race result instance if not signed in', function(done) {
		// Set Race result user 
		raceResult.user = user;

		// Create new Race result model instance
		var raceResultObj = new RaceResult(raceResult);

		// Save the Race result
		raceResultObj.save(function() {
			// Try deleting Race result
			request(app).delete('/race-results/' + raceResultObj._id)
			.expect(401)
			.end(function(raceResultDeleteErr, raceResultDeleteRes) {
				// Set message assertion
				(raceResultDeleteRes.body.message).should.match('User is not logged in');

				// Handle Race result error error
				done(raceResultDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		RaceResult.remove().exec();
		done();
	});
});