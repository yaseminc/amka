'use strict';

// Configuring the Articles module
angular.module('about').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'About', 'about', 'dropdown', null, null, null, 4);
        Menus.addSubMenuItem('topbar', 'about', 'Contact', 'contact');
        Menus.addSubMenuItem('topbar', 'about', 'History', 'history');
        Menus.addSubMenuItem('topbar', 'about', 'Directors', 'directors');
        Menus.addSubMenuItem('topbar', 'about', 'Meeting Minutes', 'meeting-minutes');
        Menus.addSubMenuItem('topbar', 'about', 'Rules & Forms', 'rules-forms');
    }
]);
