// master gallery controller

define(function () {
	'use strict';

	return [
		'$http',
		'$location',
		'$routeParams',
		'$scope',

		'buttonBarSvc',
		'comboBoxSvc',
		'modalImageSvc',
		
		function ($http, $location, $routeParams, $scope, buttonBarSvc, comboBoxSvc, modalImageSvc) {
			var category = $routeParams.category && $routeParams.category.charAt(0).toUpperCase() + $routeParams.category.slice(1);

			if (category && !!~comboBoxSvc.imageBrowserSelector.items.indexOf(category)) {
				comboBoxSvc.imageBrowserSelector.selectedItem = category;
			} else {
				$location.path('master/gallery/' + comboBoxSvc.imageBrowserSelector.selectedItem.toLowerCase());
			}

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

			$scope.handleImageLoad = function (evt, image) {
				var elem = evt.target;

				// client-exclusive properties
				image.loaded     = true;
				image.horizontal = elem.naturalWidth >= elem.naturalHeight;
			};

			$scope.$watch('imageBrowserSelector.selectedItem', function (newVal, oldVal) {
				if (newVal !== oldVal) {
					$scope.targetCategory = newVal.toLowerCase();
					$scope.postAction     = '/api/image/' + $scope.targetCategory;

					$http.get('/api/image/' + $scope.targetCategory).success(function (res) {
						$scope.images     = res;
					});

					$location.path('master/gallery/' + $scope.targetCategory);
				}
			});
		}
	];
});