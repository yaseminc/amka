'use strict';

// News controller
angular.module('news').controller('NewsController', ['$scope', '$stateParams', '$location', 'Authentication', 'News', '$state',
	function($scope, $stateParams, $location, Authentication, News, $state) {
		$scope.authentication = Authentication;

        if ($state.current.name !== 'listNews' && !(Authentication.user && Authentication.user.roles.indexOf('admin') > 0)) {
            $location.path('/signin');
        }

        $scope.froalaOptions = {
            inlineMode: false,
            theme: 'dark',
            minHeight: 200,
            buttons: [ 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily',
                'fontSize', 'color', 'formatBlock', 'blockStyle', 'align', 'insertOrderedList',
                'insertUnorderedList', 'outdent', 'indent', 'selectAll', 'createLink',
                'undo', 'removeFormat', 'redo', 'insertHorizontalRule', 'table'
            ]
        };

		// Create new News
		$scope.create = function() {
			// Create new News object
			var news = new News ({
				title: this.title,
                content: this.content
			});

			// Redirect after save
			news.$save(function(response) {
				$location.path('news/' + response._id);

				// Clear form fields
				$scope.title = '';
                $scope.content = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing News
		$scope.remove = function(news) {
			if ( news ) { 
				news.$remove();

				for (var i in $scope.news) {
					if ($scope.news [i] === news) {
						$scope.news.splice(i, 1);
					}
				}
			} else {
				$scope.news.$remove(function() {
					$location.path('news');
				});
			}
		};

		// Update existing News
		$scope.update = function() {
			var news = $scope.news;

			news.$update(function() {
				$location.path('news/' + news._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of News
		$scope.find = function() {
			$scope.news = News.query();
		};

		// Find existing News
		$scope.findOne = function() {
			$scope.news = News.get({ 
				newsId: $stateParams.newsId
			});
		};
	}
]);
