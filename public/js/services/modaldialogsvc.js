// modal dialog service

define(function () {
	'use strict';

	return [
		function () { // use as factory
			return {
				model: {
					inUse: false,
					title: '',
					content: '',
					choice: '', // singular, binary, ternary (?)
					buttons: [],

					close: function () {
						this.inUse = false;
						this.title = '';
						this.content = '';
						this.choice = '';
						this.buttons = [];
					}
				}
			};
		}
	];
});