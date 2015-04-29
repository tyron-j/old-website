// master blog controller

define(function () {
	'use strict';

	return [
		'$scope',

		'buttonBarSvc',
		'sideBarSvc',
		
		function ($scope, buttonBarSvc, sideBarSvc) {
			sideBarSvc.blogMode($scope);

			$scope.buttonBar = buttonBarSvc.getBlogEditor($scope);
		}
	];
});