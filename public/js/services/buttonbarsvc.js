// button bar service

define(function () {
	'use strict';

	return [
		// deps
		function () { // use as factory... or service?
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