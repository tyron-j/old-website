// side bar directive

define(function () {
	'use strict';

	return function () {
		return {
			restrict: 'E',
			templateUrl: '/widgets/sidebar',
			scope: {
				model: '=uiModel'
			}
		};
	};
});