// gallery controller

define(function () {
	'use strict';

	return [
		'$http',
		'$scope',

		'modalImageSvc',
		
		function ($http, $scope, modalImageSvc) {
			$http.get('/api/artwork').success(function (res) {
				$scope.artworks = res;
			});

			$scope.modalImage = modalImageSvc.model;
		}
	];
});