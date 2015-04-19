// side bar directive

define(function () {
	'use strict';

	return function () {
		return {
			templateUrl: '/widgets/sidebar',
			scope: {
				model: '='
			}
		}
	};
});