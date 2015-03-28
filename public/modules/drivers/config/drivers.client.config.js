'use strict';

// Configuring the Articles module
angular.module('drivers').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Drivers', 'drivers', 'item', '/drivers(/create)?');
        Menus.addSubMenuItem('topbar', 'Admin', 'New Driver', 'drivers/create');
	}
]);