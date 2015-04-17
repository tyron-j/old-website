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

			$scope.sideBar = { // to-do: use a service to instantiate a side bar?
				inUse: false,
				selectItem: function (blog) { // this function varies based on the side bar's content
					if (!blog.content) { // if not already fetched
						$http.get('/api/blog/' + blog.title).success(function (blogContent) {
							blog.content = blogContent;
						});
					}

					this.selectedItem = blog;
				}
			};
		}
	];
});