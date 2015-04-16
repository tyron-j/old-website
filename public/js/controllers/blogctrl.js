// blog controller

define(function () {
	'use strict';

	return [
		'$http',
		'$scope',
		
		function ($http, $scope) {
			// to-do: duplicate code
			$http.get('/api/blog').success(function (blogs) { // to-do: use a service/factory
				$scope.sideBar.inUse   = true;
				$scope.sideBar.title   = 'Blogs';
				$scope.sideBar.items   = blogs;

				$scope.sideBar.selectItem(blogs[0]);
			});

			// destruction; only execute if next location doesn't use side bar
			$scope.$on('$locationChangeStart', function (evt, next, current) { // to-do: use a service/factory
				$scope.sideBar.inUse   = false;
				$scope.sideBar.selectedItem = null;
				// $scope.sideBar.title   = '';
				// $scope.sideBar.items   = [];
			});
		}
	];
});