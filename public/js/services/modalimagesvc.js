// modal image service

define(function () {
	'use strict';

	return [
		function () { // use as factory
			return {
				model: {
					inUse: false,
					imageTitle: '',

					open: function (imageTitle) {
						this.inUse      = true;
						this.imageTitle = imageTitle;
					},

					close: function () {
						this.inUse      = false;
						this.imageTitle = '';
					}
				}
			};
		}
	];
});