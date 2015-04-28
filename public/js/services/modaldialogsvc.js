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

					open: function (options) {
						this.inUse = true;
						this.title = options.title;
						this.content = options.content;
						this.buttons = options.buttons;

						// to-do: consider moving this logic to the jade file
						if (options.choice) {
							this.choice = options.choice;
						} else {
							switch (options.buttons.length) {
								case 1:
									this.choice = 'singular';
									break;
								case 2:
									this.choice = 'binary';
									break;
								case 3:
									this.choice = 'ternary';
									break;
							}
						}
					},

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