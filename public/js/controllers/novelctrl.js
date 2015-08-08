// novel controller

define(function () {
	'use strict';

	return [
		'$http',
		'$scope',
		
		function ($http, $scope) {
			$http.get('/api/image/novel').success(function (res) {
				$scope.images = res;
			});

			$scope.firstImageLoaded = false;

			$scope.handleImageLoad = function (evt, image) {
				if (!$scope.firstImageLoaded) {
					$scope.firstImageLoaded = true;
				}

				image.loaded = true;
			};
		}
	];
});