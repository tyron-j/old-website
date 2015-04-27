// modal dialog directive

define(function () {
	'use strict';

	return function () {
		return {
			templateUrl: '/widgets/modaldialog',
			scope: {
				model: '=uiModel'
			}
		}
	};
});