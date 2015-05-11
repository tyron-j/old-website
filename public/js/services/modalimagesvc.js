// modal image service

define(function () {
	'use strict';

	return [
		function () { // use as factory
			return {
				model: {
					inUse: false,
					artworkTitle: '',

					open: function (artworkTitle) {
						this.inUse        = true;
						this.artworkTitle = artworkTitle;
					},

					close: function () {
						this.inUse        = false;
						this.artworkTitle = '';
					}
				}
			};
		}
	];
});