'use strict';

//Setting up route
angular.module('about').config(['$stateProvider',
	function($stateProvider) {
		// About state routing
		$stateProvider.
		state('about-us', {
			url: '/about-us',
			templateUrl: 'modules/about/views/about-us.client.view.html'
		}).
		state('rules-forms', {
			url: '/rules-forms',
			templateUrl: 'modules/about/views/rules-forms.client.view.html'
		}).
		state('meeting-minutes', {
			url: '/meeting-minutes',
			templateUrl: 'modules/about/views/meeting-minutes.client.view.html'
		}).
		state('directors', {
			url: '/directors',
			templateUrl: 'modules/about/views/directors.client.view.html'
		}).
		state('history', {
			url: '/history',
			templateUrl: 'modules/about/views/history.client.view.html'
		}).
		state('contact', {
			url: '/contact',
			templateUrl: 'modules/about/views/contact.client.view.html'
		}).
		state('about', {
			url: '/about',
			templateUrl: 'modules/about/views/about.client.view.html'
		});
	}
]);