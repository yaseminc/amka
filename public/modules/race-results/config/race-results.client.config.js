'use strict';

// Configuring the Articles module
angular.module('race-results').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Race Results', 'race-results', 'item', '/race-results(/create)?');
		Menus.addSubMenuItem('topbar', 'Admin', 'New Race result', 'race-results/create');
	}
]);
