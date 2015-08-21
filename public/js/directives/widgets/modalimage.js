// modal image directive

define(function () {
	'use strict';

	return function () {
		return {
			restrict: 'E',
			templateUrl: '/widgets/modalimage',
			scope: {
				model: '=uiModel'
			}
		};
	};
});