// button bar directive

define(function () {
	'use strict';

	return function () {
		return {
			restrict: 'E',
			templateUrl: '/widgets/buttonbar',
			scope: {
				model: '=uiModel'
			}
		};
	};
});