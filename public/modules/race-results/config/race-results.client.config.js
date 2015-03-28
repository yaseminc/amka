'use strict';

// Configuring the Articles module
angular.module('race-results').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Season', 'race-results', 'dropdown', '/race-results(/create)?', null, null, 2);
		Menus.addSubMenuItem('topbar', 'race-results', 'Race Results');
        Menus.addSubMenuItem('topbar', 'race-results', 'Standings');
        Menus.addSubMenuItem('topbar', 'race-results', 'Calendar');
        Menus.addSubMenuItem('topbar', 'race-results', 'Drivers');


    }
]);
