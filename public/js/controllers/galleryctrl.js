// gallery controller

define(function () {
	'use strict';

	return [
		'$http',
		'$scope',

		'modalImageSvc',
		
		function ($http, $scope, modalImageSvc) {
			$http.get('/api/image/gallery').then(function (res) {
				$scope.images = res.data;
			});

			$scope.modalImage = modalImageSvc.model;

			$scope.handleImageLoad = function (evt, image) {
				image.loaded = true; // client-exclusive property
			};

			// to-do: use custom ::-webkit-scrollbar styles
			// disregarding scroll bar width
			var gallery        = document.getElementsByClassName('gallery')[0];
			var scrollBarWidth = gallery.offsetWidth - gallery.clientWidth;

			gallery.style.paddingLeft = scrollBarWidth + 'px';
		}
	];
});