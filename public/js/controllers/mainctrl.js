// main controller

define(function () {
	'use strict';

	return [
		'$scope',

		'bgImageSvc',
		'modalDialogSvc',
		'modalSelectorSvc',
		'navBarSvc',
		'sideBarSvc',
		
		function ($scope, bgImageSvc, modalDialogSvc, modalSelectorSvc, navBarSvc, sideBarSvc) {
			navBarSvc.globalMode();

			$scope.bgImage       = bgImageSvc.model;
			$scope.modalDialog   = modalDialogSvc.model;
			$scope.modalSelector = modalSelectorSvc.model;
			$scope.navBar        = navBarSvc.model;
			$scope.sideBar       = sideBarSvc.model;
		}
	];
});