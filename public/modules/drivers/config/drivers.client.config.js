'use strict';

// Configuring the Articles module
angular.module('drivers').run(['Menus',
	function(Menus) {
		// Set top bar menu items
        Menus.addSubMenuItem('topbar', 'Admin', 'New Driver', 'drivers/create');
	}
]);
