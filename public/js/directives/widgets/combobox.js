// combo box directive

define(function () {
	'use strict';

	return function () {
		return {
			restrict: 'E',
			templateUrl: '/widgets/combobox',
			scope: {
				model: '=uiModel'
			}
		}
	};
});