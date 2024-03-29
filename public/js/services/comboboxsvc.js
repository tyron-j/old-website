// combo box service

define(function () {
	'use strict';

	return [
		function () { // use as factory
			var ComboBox = function (items, upward, idx) { // constructor
				if (!items.length) {
					console.error("Empty array passed into combo box.");
				}

				this.inUse        = false;
				this.items        = items;
				this.selectedItem = items[idx || 0];
				this.upward       = upward || false;
			};

			ComboBox.prototype.toggleState = function() {
				this.inUse = !this.inUse;
			};

			ComboBox.prototype.selectItem = function(item) {
				this.selectedItem = item;
				this.inUse = false;
			};

			return {
				imageBrowserSelector: new ComboBox([
					'About',
					'Blog',
					'Gallery',
					'Home',
					'Novel'
				], true, 2),

				blogCategorySelector: new ComboBox([
					'Around the World',
					'Off on a Tangent',
					'Update',
					'Wizard of JS'
				])
			};
		}
	];
});