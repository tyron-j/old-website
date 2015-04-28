// modal dialog service

define(function () {
	'use strict';

	return [
		function () { // use as factory
			return {
				model: { // using a singleton since there will only be one instance of a modal dialog
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