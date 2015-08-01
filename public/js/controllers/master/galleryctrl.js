// master gallery controller

define(function () {
	'use strict';

	return [
		'$http',
		'$scope',

		'buttonBarSvc',
		'modalImageSvc',
		
		function ($http, $scope, buttonBarSvc, modalImageSvc) {
			$http.get('/api/image').success(function (res) {
				$scope.images = res;
			});

			$scope.imageThumbnailEditor = buttonBarSvc.getImageThumbnailEditor($scope);
			$scope.imageBrowserEditor   = buttonBarSvc.getImageBrowserEditor($scope);
			$scope.modalImage           = modalImageSvc.model;

			// to-do: consider making image browser a widget and moving these methods to a service
			$scope.inspectImage = function (image) {
				// to-do: only execute logic if not in edit mode
				$scope.inspectedImage = image;
			};

			$scope.toggleImageSelection = function (image) {
				image.selected = !image.selected;
			};

			$scope.getSelectedImages = function () {
				return $scope.images.filter(function (image) {
					return image.selected;
				});
			};
		}
	];
});