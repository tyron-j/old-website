// master gallery controller

define(function () {
	'use strict';

	return [
		'$http',
		'$scope',

		'buttonBarSvc',
		
		function ($http, $scope, buttonBarSvc) {
			$http.get('/api/artwork').success(function (res) {
				$scope.artworks = res;
			});

			$scope.artworkThumbnailEditor = buttonBarSvc.getArtworkThumbnailEditor($scope);
			$scope.artworkBrowserEditor   = buttonBarSvc.getArtworkBrowserEditor($scope);

			// to-do: also allow selecting multiple artworks for multiple deletion
			$scope.selectArtwork = function (artwork) {
				$scope.selectedArtwork = artwork;
			}
		}
	];
});