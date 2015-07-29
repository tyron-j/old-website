// background image directive

define(function () {
	'use strict';

	return function () {
		return {
			templateUrl: '/widgets/bgimage',
			scope: {
				model: '=uiModel'
			}
		}
	};
});