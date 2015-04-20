// nav bar directive

define(function () {
	'use strict';

	return function () {
		return {
			templateUrl: '/widgets/navbar',
			scope: {
				model: '=uiModel'
			}
		}
	};
});