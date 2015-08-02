// modal selector service

define(function () {
	'use strict';

	return [
		function () { // use as factory
			var model = {
				inUse: false,
				items: [ 1, 2, 3, 4, 5, 6, 7 ], // to-do: temporary
				buttons: [],

				open: function (buttons) {
					this.buttons = buttons;
					this.inUse   = true;
				},

				close: function () {
					this.inUse = false;
				}
			};

			return {
				model: model
			};
		}
	];
});