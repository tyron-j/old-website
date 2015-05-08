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
					title: 'Home',
					href: 'home'
				}, {
					title: 'About',
					href: 'about'
				}, {
					title: 'Blog',
					href: 'blog'
				}, {
					title: 'Gallery',
					href: 'gallery'
				}, {
					title: 'Novel',
					href: 'novel'
				}, {
					title: 'Resume',
					href: 'resume'
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
				}, {
					title: 'Tests',
					subItems: [{
						title: 'Unit',
						href: 'tests/unit'
					}, {
						title: 'UI',
						href: 'tests/ui'
					}]
				}]
			};
		}
	];
});