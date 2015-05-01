// main controller

define(function () {
	'use strict';

	return [
		'$scope',

		'modalDialogSvc',
		'navBarSvc',
		'sideBarSvc',
		
		function ($scope, modalDialogSvc, navBarSvc, sideBarSvc) {
			navBarSvc.globalMode();

			$scope.modalDialog = modalDialogSvc.model;
			$scope.navBar      = navBarSvc.model;
			$scope.sideBar     = sideBarSvc.model;
		}
	];
});