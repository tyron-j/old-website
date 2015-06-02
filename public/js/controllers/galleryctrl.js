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

			// to-do: use custom ::-webkit-scrollbar styles
			// disregarding scroll bar width
			var gallery        = document.getElementsByClassName('gallery')[0];
			var scrollBarWidth = gallery.offsetWidth - gallery.clientWidth;

			gallery.style.paddingLeft = scrollBarWidth + 'px';
		}
	];
});