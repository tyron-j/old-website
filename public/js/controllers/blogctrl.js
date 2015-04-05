// blog controller

define(function () {
	'use strict';

	return [
		'$http',
		'$scope',
		
		function ($http, $scope) {
			$http.get('/api/blog').success(function (blogs) {
				$scope.blogs = blogs;
			});
		}
	];
});