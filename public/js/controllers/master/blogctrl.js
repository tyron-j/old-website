// master blog controller

define(function () {
	'use strict';

	return [
		'$scope',

		'buttonBarSvc',
		'comboBoxSvc',
		'sideBarSvc',
		
		function ($scope, buttonBarSvc, comboBoxSvc, sideBarSvc) {
			// to-do: consider establishing interactivity between services through controllers
			sideBarSvc.blogMode($scope);

			$scope.buttonBar     = buttonBarSvc.getBlogEditor($scope);
			$scope.comboBox      = comboBoxSvc.blogCategorySelector;
		}
	];
});