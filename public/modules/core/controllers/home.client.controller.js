'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', 'News',
	function($scope, Authentication, News) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

        // Find a list of News
        $scope.findNews = function() {
            $scope.news = News.query();
        };
	}
]);
