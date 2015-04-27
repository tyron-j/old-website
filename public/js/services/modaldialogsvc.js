// modal dialog service

define(function () {
	'use strict';

	return [
		function () { // use as factory
			return {
				model: { // to-do: clean up the test properties
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