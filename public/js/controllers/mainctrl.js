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

			$scope.$on('$locationChangeStart', function (evt, next, current) {
				var splitPath    = next.split('/');
				var splitPathLen = splitPath.length;
				var finalPath    = splitPath.pop();

				if (splitPathLen !== 4 || finalPath !== 'login') {
					$scope.navBar.inUse = true;
				} else {
					$scope.navBar.inUse = false;
				}
			});
		}
	];
});