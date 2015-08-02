// modal selector service

define(function () {
	'use strict';

	return [
		function () { // use as factory
			var model = {
				inUse: false,
				images: [],
				buttons: [],
				selectedImage: null,

				open: function (images, buttons) {
					this.images  = images;
					this.buttons = buttons;
					this.inUse   = true;
				},

				close: function () {
					this.inUse         = false;
					this.images        = [];
					this.buttons       = [];
					this.selectedImage = null;
				},

				handleImageLoad: function (evt, image) {
					var elem = evt.target;

					image.loaded     = true;
					image.horizontal = elem.naturalWidth >= elem.naturalHeight;
				},

				selectImage: function (image) {
					model.selectedImage = image;
				}
			};

			return {
				model: model
			};
		}
	];
});