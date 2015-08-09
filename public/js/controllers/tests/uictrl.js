// ui tests controller

define(function () {
	'use strict';

	return [
		'$http',
		'$scope',

		'modalSelectorSvc',
		
		function ($http, $scope, modalSelectorSvc) {
			var modalSelector = modalSelectorSvc.model;

			$scope.openModalSelector = function () {
				console.log("Images not ready yet!");
			};

			$http.get('/api/image/blog').then(function (res) {
				$scope.openModalSelector = function () {
					modalSelector.open(res.data, [{
						title: 'OK',
						onClick: function () {
							console.log("OK pressed!");
						}
					}, {
						title: 'Cancel',
						onClick: function () {
							modalSelector.close();
						}
					}]);
				}
			});
		}
	];
});