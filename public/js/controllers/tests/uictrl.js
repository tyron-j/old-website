// ui tests controller

define(function () {
	'use strict';

	return [
		'$scope',

		'modalSelectorSvc',
		
		function ($scope, modalSelectorSvc) {
			var modalSelector = $scope.modalSelector = modalSelectorSvc.model;

			$scope.openModalSelector = function () {
				modalSelector.open([{
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
		}
	];
});