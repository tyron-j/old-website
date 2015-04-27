// modal dialog service

define(function () {
	'use strict';

	return [
		function () { // use as factory
			return {
				model: {
					inUse: false,
					title: 'Warning',
					content: 'Test',
					choice: 'binary',
					buttons: [{
						title: 'OK'
					}, {
						title: 'Cancel'
					}]
				}
			};
		}
	];
});