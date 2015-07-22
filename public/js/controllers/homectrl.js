// home controller

define(function () {
	'use strict';

	return [
		'$scope',
		
		function ($scope) {
			$scope.homeLinks = [{
				title: 'About',
				href: '/about'
			}, {
				title: 'Blog',
				href: '/blog'
			}, {
				title: 'Gallery',
				href: '/gallery'
			}, {
				title: 'Novel',
				href: '/novel'
			}, {
				title: 'Resume',
				href: '/resume'
			}, {
				title: 'Special',
				href: '/special'
			}]
		}
	];
});