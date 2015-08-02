// modal selector service

define(function () {
	'use strict';

	return [
		function () { // use as factory
			var model = {
				inUse: false,
				images: [],
				buttons: [],

				open: function (images, buttons) {
					this.images  = images;
					this.buttons = buttons;
					this.inUse   = true;
				},

				close: function () {
					this.inUse = false;
				},

				handleImageLoad: function (evt, image) {
					var elem = evt.target;

					image.loaded     = true;
					image.horizontal = elem.naturalWidth >= elem.naturalHeight;
				}
			};

			return {
				model: model
			};
		}
	];
});