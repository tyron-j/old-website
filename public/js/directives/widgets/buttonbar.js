// button bar directive

define(function () {
	'use strict';

	return function () {
		return {
			templateUrl: '/widgets/buttonbar',
			scope: {
				model: '=uiModel'
			}
		}
	};
});