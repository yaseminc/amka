'use strict';

(function() {
	// Race results Controller Spec
	describe('Race results Controller Tests', function() {
		// Initialize global variables
		var RaceResultsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Race results controller.
			RaceResultsController = $controller('RaceResultsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Race result object fetched from XHR', inject(function(RaceResults) {
			// Create sample Race result using the Race results service
			var sampleRaceResult = new RaceResults({
				name: 'New Race result'
			});

			// Create a sample Race results array that includes the new Race result
			var sampleRaceResults = [sampleRaceResult];

			// Set GET response
			$httpBackend.expectGET('race-results').respond(sampleRaceResults);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.raceResults).toEqualData(sampleRaceResults);
		}));

		it('$scope.findOne() should create an array with one Race result object fetched from XHR using a raceResultId URL parameter', inject(function(RaceResults) {
			// Define a sample Race result object
			var sampleRaceResult = new RaceResults({
				name: 'New Race result'
			});

			// Set the URL parameter
			$stateParams.raceResultId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/race-results\/([0-9a-fA-F]{24})$/).respond(sampleRaceResult);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.raceResult).toEqualData(sampleRaceResult);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(RaceResults) {
			// Create a sample Race result object
			var sampleRaceResultPostData = new RaceResults({
				name: 'New Race result'
			});

			// Create a sample Race result response
			var sampleRaceResultResponse = new RaceResults({
				_id: '525cf20451979dea2c000001',
				name: 'New Race result'
			});

			// Fixture mock form input values
			scope.name = 'New Race result';

			// Set POST response
			$httpBackend.expectPOST('race-results', sampleRaceResultPostData).respond(sampleRaceResultResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Race result was created
			expect($location.path()).toBe('/race-results/' + sampleRaceResultResponse._id);
		}));

		it('$scope.update() should update a valid Race result', inject(function(RaceResults) {
			// Define a sample Race result put data
			var sampleRaceResultPutData = new RaceResults({
				_id: '525cf20451979dea2c000001',
				name: 'New Race result'
			});

			// Mock Race result in scope
			scope.raceResult = sampleRaceResultPutData;

			// Set PUT response
			$httpBackend.expectPUT(/race-results\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/race-results/' + sampleRaceResultPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid raceResultId and remove the Race result from the scope', inject(function(RaceResults) {
			// Create new Race result object
			var sampleRaceResult = new RaceResults({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Race results array and include the Race result
			scope.raceResults = [sampleRaceResult];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/race-results\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleRaceResult);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.raceResults.length).toBe(0);
		}));
	});
}());