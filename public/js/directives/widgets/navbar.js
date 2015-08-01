// nav bar directive

define(function () {
	'use strict';

	return function () {
		return {
			restrict: 'E',
			templateUrl: '/widgets/navbar',
			scope: {
				model: '=uiModel'
			}
		}
	};
});