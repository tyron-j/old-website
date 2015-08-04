// master blog controller

define(function () {
	'use strict';

	return [
		'$scope',

		'buttonBarSvc',
		'comboBoxSvc',
		'modalSelectorSvc',
		'sideBarSvc',
		
		function ($scope, buttonBarSvc, comboBoxSvc, modalSelectorSvc, sideBarSvc) {
			// to-do: consider establishing interactivity between services through controllers
			sideBarSvc.blogMode($scope);

			$scope.buttonBar     = buttonBarSvc.getBlogEditor($scope);
			$scope.comboBox      = comboBoxSvc.blogCategorySelector;
			$scope.modalSelector = modalSelectorSvc.model;
		}
	];
});