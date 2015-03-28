'use strict';

// Configuring the Articles module
angular.module('drivers').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Drivers', 'drivers', 'item', '/drivers(/create)?', null, null, 3);
        Menus.addSubMenuItem('topbar', 'Admin', 'New Driver', 'drivers/create');
	}
]);
