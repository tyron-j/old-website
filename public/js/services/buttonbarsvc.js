// button bar service

define(function () {
	'use strict';

	return [
		'$http',

		function ($http) { // use as factory... or service?
			return {
				blogEditor: { // singleton
					items: [{
						icon: 'save'
					}, {
						icon: 'pencil'
					}, {
						icon: 'trash'
					}]
				}
			};
		}
	];
});