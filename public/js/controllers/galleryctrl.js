// gallery controller

define(function () {
	'use strict';

	return [
		'$http',
		'$scope',
		'$timeout',

		'modalImageSvc',
		
		function ($http, $scope, $timeout, modalImageSvc) {
			$http.get('/api/image/gallery').then(function (res) {
				var images         = $scope.images = res.data;
				var setLoadTimeout = function (image) {
					image.loadTimeout = $timeout(function () {
						if (!image.loaded) {
							image.title = image.originalTitle + '?time=' + (new Date()).getTime();

							console.log("Setting new load timeout");
							setLoadTimeout(image);
						}
					}, 5000);
				};

				images.forEach(function (image) {
					image.originalTitle = image.title;

					setLoadTimeout(image);
				});
			});

			$scope.modalImage = modalImageSvc.model;

			$scope.handleImageLoad = function (evt, image) {
				image.loaded = true; // client-exclusive property

				console.log("Image loaded");
				$timeout.cancel(image.loadTimeout);
			};

			// to-do: use custom ::-webkit-scrollbar styles
			// disregarding scroll bar width
			var gallery        = document.getElementsByClassName('gallery')[0];
			var scrollBarWidth = gallery.offsetWidth - gallery.clientWidth;

			gallery.style.paddingLeft = scrollBarWidth + 'px';
		}
	];
});