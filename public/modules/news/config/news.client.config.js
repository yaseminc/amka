'use strict';

// Configuring the Articles module
angular.module('news').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'News', 'news', 'item', '/news(/create)?', null, null, 0);
        Menus.addMenuItem('topbar', 'Admin', 'admin', 'dropdown', null, false);
		Menus.addSubMenuItem('topbar', 'Admin', 'Add News', 'news/create');
	}
]);
