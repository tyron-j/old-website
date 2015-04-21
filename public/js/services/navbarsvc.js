// nav bar service

define(function () {
	'use strict';

	return [
		'$location',

		function ($location) { // use as factory
			return {
				model: { // using a singleton since there will only be one instance of a nav bar
					inUse: false,
					items: []
				},

				globalMode: function () {
					var navBar = this.model;

					navBar.items = this.publicLinks;

					if ($location.host() === 'localhost') {
						navBar.items = navBar.items.concat(this.masterLinks);
					}
				},

				publicLinks: [{
					title: 'Login',
					href: 'login'
				}, {
					title: 'Blog',
					href: 'blog'
				}, {
					title: 'Gallery',
					href: 'gallery'
				}],

				masterLinks: [{
					title: 'Master',
					subItems: [{
						title: 'Blog',
						href: 'master/blog'
					}, {
						title: 'Gallery',
						href: 'master/gallery'
					}]
				}]
			};
		}
	];
});