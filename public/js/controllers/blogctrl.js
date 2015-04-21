// blog controller

define(function () {
	'use strict';

	return [
		'$scope',

		'sideBarSvc',
		
		function ($scope, sideBarSvc) {
			sideBarSvc.blogMode($scope);
		}
	];
});