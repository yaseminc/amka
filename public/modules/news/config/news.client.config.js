'use strict';

// Configuring the Articles module
angular.module('news').run(['Menus', 'Authentication',
	function(Menus, Authentication) {
		// Set top bar menu items
        if (Authentication.user && Authentication.user.roles.indexOf('admin') > -1) {
            Menus.addMenuItem('topbar', 'News', 'news', 'dropdown', '/news(/create)?', null, null, 0);
            Menus.addSubMenuItem('topbar', 'news', 'List News', 'news');
            Menus.addSubMenuItem('topbar', 'news', 'Add News', 'news/create');
        } else {
            Menus.addMenuItem('topbar', 'News', 'news', 'item', '/news(/create)?', null, null, 0);
        }
	}
]);
