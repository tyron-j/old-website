// button bar service

define(function () {
	'use strict';

	return [
		'$http',

		'sideBarSvc',

		function ($http, sideBarSvc) { // use as factory... or service?
			var sideBar = sideBarSvc.model;

			return {
				blogEditor: { // singleton
					items: [{ // save blog
						icon: 'save',
						onClick: function () {
							var blog = sideBar.selectedItem;
						}
					}, { // edit blog
						icon: 'pencil',
						onClick: function () {
							var blog = sideBar.selectedItem;
						}
					}, { // delete blog
						icon: 'trash',
						onClick: function () {
							var blog = sideBar.selectedItem;
						}
					}]
				}
			};
		}
	];
});