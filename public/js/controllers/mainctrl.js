// main controller

define(function () {
	'use strict';

	return [
		'$http',
		'$scope',

		'navBarSvc',
		'sideBarSvc',
		
		function ($http, $scope, navBarSvc, sideBarSvc) {
			navBarSvc.globalMode();

			$scope.navBar  = navBarSvc.model;
			$scope.sideBar = sideBarSvc.model;
		}
	];
});