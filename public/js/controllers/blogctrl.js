// blog controller

define(function () {
	'use strict';

	return [
		'$scope',

		'bgImageSvc',
		'sideBarSvc',
		
		function ($scope, bgImageSvc, sideBarSvc) {
			bgImageSvc.blogMode($scope);
			sideBarSvc.blogMode($scope);
		}
	];
});