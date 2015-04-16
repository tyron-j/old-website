// main controller

define(function () {
	'use strict';

	return [
		'$http',
		'$scope',
		
		function ($http, $scope) {
			// "global" objects that can be manipulated by any controller
			$scope.navBar = {
				inUse: false,
				items: [{
					title: 'Login',
					href: 'login'
				}, {
					title: 'Blog',
					href: 'blog'
				}, {
					title: 'Gallery',
					href: 'gallery'
				}, {
					title: 'Master Blog',
					href: 'master/blog'
				}, {
					title: 'Master Gallery',
					href: 'master/gallery'
				}]
			};

			$scope.sideBar = {
				inUse: false
			};
		}
	];
});