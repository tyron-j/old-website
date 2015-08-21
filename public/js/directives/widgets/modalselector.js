// modal selector directive

define(function () {
	'use strict';

	return function () {
		return {
			restrict: 'E',
			templateUrl: '/widgets/modalselector',
			scope: {
				model: '=uiModel'
			}
		};
	};
});