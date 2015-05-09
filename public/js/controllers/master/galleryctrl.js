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


			// to-do: consider making artwork browser a widget and moving these methods to a service
			$scope.inspectArtwork = function (artwork) {
				// to-do: only execute logic if not in edit mode
				$scope.inspectedArtwork = artwork;
			}

			$scope.toggleArtworkSelection = function (artwork) {
				console.log("Toggling artwork selection!");
				artwork.selected = !artwork.selected;
			}

			$scope.getSelectedArtworks = function () {
				return $scope.artworks.filter(function (artwork) {
					return artwork.selected;
				});
			}
		}
	];
});