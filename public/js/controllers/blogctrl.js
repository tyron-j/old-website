// blog controller

define(function () {
	'use strict';

	return [
		'$http',
		'$scope',
		
		function ($http, $scope) {
			$http.get('/api/blog').success(function (blogs) {
				$scope.sideBar.inUse   = true;
				$scope.sideBar.title   = 'Blogs';
				$scope.sideBar.items   = blogs;

				// this function varies based on the side bar's content
				$scope.sideBar.selectItem = function (blog) { // to-do: use a service?
					if (!blog.content) { // if not already fetched
						$http.get('/api/blog/' + blog.title).success(function (blogContent) {
							blog.content = blogContent;
						});
					}

					$scope.sideBar.selectedItem = blog;
				};

				$scope.sideBar.selectItem(blogs[0]);
			});

			// destruction
			$scope.$on('$locationChangeStart', function (evt, next, current) {
				$scope.sideBar.inUse   = false;
				$scope.sideBar.selectedItem = null;
				// $scope.sideBar.title   = '';
				// $scope.sideBar.items   = [];
			});
		}
	];
});