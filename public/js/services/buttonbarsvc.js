// button bar service

define(function () {
	'use strict';

	return [
		'$http',

		'sideBarSvc',

		function ($http, sideBarSvc) { // use as factory... or service?
			var sideBar = sideBarSvc.model;
			var blogEditor = { // singleton
				inEditMode: false,

				items: [{
					title: 'Save',
					icon: 'save',
					hidden: false,

					onClick: function () {
						var blog = sideBar.selectedItem;
					}
				}, {
					title: 'Edit',
					icon: 'pencil',
					hidden: false,

					onClick: function () {
						var blog = sideBar.selectedItem;

						blogEditor.inEditMode      = true;
						blogEditor.items[3].hidden = false;
					}
				}, {
					title: 'Delete',
					icon: 'trash',
					hidden: false,

					onClick: function () {
						var blog = sideBar.selectedItem;
					}
				}, {
					title: 'Cancel',
					icon: 'close',
					hidden: true,

					onClick: function () {
						var blog = sideBar.selectedItem;

						blogEditor.inEditMode = false;
						this.hidden           = true;
					}
				}]
			};

			return {
				blogEditor: blogEditor
			};
		}
	];
});