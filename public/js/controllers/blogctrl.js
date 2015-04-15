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
			});

			// destruction
			$scope.$on('$locationChangeStart', function (evt, next, current) {
				$scope.sideBar.inUse   = false;
				// $scope.sideBar.title   = '';
				// $scope.sideBar.items   = [];
			});
		}
	];
});