// modal image directive

define(function () {
	'use strict';

	return function () {
		return {
			templateUrl: '/widgets/modalimage',
			scope: {
				model: '=uiModel'
			}
		}
	};
});