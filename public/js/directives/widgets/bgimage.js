// background image directive

define(function () {
	'use strict';

	return function () {
		return {
			restrict: 'E',
			templateUrl: '/widgets/bgimage',
			scope: {
				model: '=uiModel'
			}
		};
	};
});