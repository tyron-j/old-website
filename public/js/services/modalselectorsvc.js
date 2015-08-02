// modal selector service

define(function () {
	'use strict';

	return [
		function () { // use as factory
			return {
				model: {
					inUse: false,

					open: function (url) {
						this.inUse = true;
					},

					close: function () {
						this.inUse = false;
					}
				}
			};
		}
	];
});