// combo box directive

define(function () {
	'use strict';

	return function () {
		return {
			templateUrl: '/widgets/combobox',
			scope: {
				model: '=uiModel'
			}
		}
	};
});