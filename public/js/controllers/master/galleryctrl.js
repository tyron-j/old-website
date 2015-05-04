// master gallery controller

define(function () {
	'use strict';

	return [
		'$http',
		'$scope',
		
		function ($http, $scope) {
			$http.get('/api/artwork').success(function (res) {
				$scope.artworks = res;
			});

			$scope.selectArtwork = function (artwork) {
				$scope.selectedArtwork = artwork;
			}
		}
	];
});