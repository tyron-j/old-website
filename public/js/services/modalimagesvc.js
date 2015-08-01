// modal image service

define(function () {
	'use strict';

	return [
		function () { // use as factory
			return {
				model: {
					inUse: false,
					imageTitle: '',

					open: function (imageTitle, imageCategory) {
						this.inUse         = true;
						this.imageTitle    = imageTitle;
						this.imageCategory = imageCategory;
					},

					close: function () {
						this.inUse         = false;
						this.imageTitle    = '';
						this.imageCategory = '';
					}
				}
			};
		}
	];
});