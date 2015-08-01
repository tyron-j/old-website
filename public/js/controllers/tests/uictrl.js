// ui tests controller

define(function () {
	'use strict';

	return [
		'$scope',

		'comboBoxSvc',
		
		function ($scope, comboBoxSvc) {
			$scope.comboBox = comboBoxSvc.imageBrowserSelector;
		}
	];
});