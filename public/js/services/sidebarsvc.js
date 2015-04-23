// side bar service

define(function () {
	'use strict';

	return [
		'$http',
		'$location',

		function ($http, $location) { // use as factory
			return {
				model: { // using a singleton since there will only be one instance of a side bar
					inUse: false,
					title: '',
					items: [],
					selectItem: function () {},
					newItem: {
						allowed: false,
						title: '',
						create: function () {}
					}
				},

				blogMode: function ($scope) {
					var that    = this;
					var sideBar = this.model;

					$http.get('/api/blog').success(function (blogs) {
						sideBar.inUse      = true;
						sideBar.title      = 'Blogs';
						sideBar.items      = blogs;
						sideBar.selectItem = that.selectBlog;

						if ($location.path() === '/master/blog') {
							sideBar.newItem.allowed = true;
							sideBar.newItem.title   = 'New Blog';
							sideBar.newItem.create  = that.createBlog;
						}

						sideBar.selectItem(blogs[0]);
					});

					// to-do: make this an individual method
					$scope.$on('$locationChangeStart', function (evt, next, current) {
						sideBar.inUse             = false;
						// sideBar.title          = '';
						// sideBar.items          = [];
						// sideBar.selectItem     = function () {};
						sideBar.selectedItem      = null;
						sideBar.newItem.allowed   = false;
						// sideBar.newItem.title  = '';
						// sideBar.newItem.create = function () {};
					});
				},

				createBlog: function () {
					//
				},

				selectBlog: function (blog) { // this function varies based on the side bar's content
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