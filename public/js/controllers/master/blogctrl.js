// master blog controller

define(function () {
	'use strict';

	return [
		'$scope',

		'buttonBarSvc',
		'sideBarSvc',
		
		function ($scope, buttonBarSvc, sideBarSvc) {
			// to-do: consider establishing interactivity between services through controllers
			sideBarSvc.blogMode($scope);

			$scope.buttonBar = buttonBarSvc.getBlogEditor($scope);
		}
	];
});