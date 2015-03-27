// gallery controller

define(function () {
	'use strict';

	return [
		'$http',
		'$scope',
		function ($http, $scope) {
			$http.get('/api/artwork').success(function (data) {
				$scope.artworks = data;
			});
		}
	];
});