// main controller

define(function () {
	'use strict';

	return [
		'$scope',

		'bgImageSvc',
		'modalDialogSvc',
		'navBarSvc',
		'sideBarSvc',
		
		function ($scope, bgImageSvc, modalDialogSvc, navBarSvc, sideBarSvc) {
			navBarSvc.globalMode();

			$scope.bgImage     = bgImageSvc.model;
			$scope.modalDialog = modalDialogSvc.model;
			$scope.navBar      = navBarSvc.model;
			$scope.sideBar     = sideBarSvc.model;
		}
	];
});