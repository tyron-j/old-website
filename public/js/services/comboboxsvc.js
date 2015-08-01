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
				this.upward       = upward;

				this.toggleState = function() {
					this.inUse = !this.inUse;
				};

				this.selectItem = function(item) {
					this.selectedItem = item;
					this.inUse = false;
				};
			};

			return {
				imageBrowserSelector: new ComboBox([
					'About',
					'Blog',
					'Gallery',
					'Home',
					'Novel'
				], true, 2)
			};
		}
	];
});