// modal dialog directive

define(function () {
	'use strict';

	return function () {
		return {
			restrict: 'E',
			templateUrl: '/widgets/modaldialog',
			scope: {
				model: '=uiModel'
			}
		};
	};
});