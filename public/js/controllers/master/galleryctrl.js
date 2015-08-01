// master gallery controller

define(function () {
	'use strict';

	return [
		'$http',
		'$scope',

		'buttonBarSvc',
		'comboBoxSvc',
		'modalImageSvc',
		
		function ($http, $scope, buttonBarSvc, comboBoxSvc, modalImageSvc) {
			$scope.imageThumbnailEditor = buttonBarSvc.getImageThumbnailEditor($scope);
			$scope.imageBrowserEditor   = buttonBarSvc.getImageBrowserEditor($scope);
			$scope.imageBrowserSelector = comboBoxSvc.imageBrowserSelector;
			$scope.modalImage           = modalImageSvc.model;
			$scope.targetCategory       = $scope.imageBrowserSelector.selectedItem.toLowerCase();
			$scope.postAction           = '/api/image/' + $scope.targetCategory;

			$http.get('/api/image/' + $scope.targetCategory).success(function (res) {
				$scope.images = res;
			});

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

			$scope.$watch('imageBrowserSelector.selectedItem', function (newVal, oldVal) {
				if (newVal !== oldVal) {
					$scope.targetCategory = newVal.toLowerCase();
					$scope.postAction     = '/api/image/' + $scope.targetCategory;

					$http.get('/api/image/' + $scope.targetCategory).success(function (res) {
						$scope.images     = res;
					});
				}
			});
		}
	];
});