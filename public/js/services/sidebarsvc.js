// side bar service

define(function () {
	'use strict';

	return [
		'$http',
		'$location',
		'$routeParams',

		function ($http, $location, $routeParams) { // use as factory
			return {
				model: { // using a singleton since there will only be one instance of a side bar
					inUse: false,
					title: '',
					items: [],
					selectItem: function () {},
					createItem: function () {},
					createItemButton: {
						inUse: false,
						title: ''
					},

					allowCreation: function (options) {
						this.createItemButton.inUse = true;
						this.createItemButton.title = options.title;
						this.createItem             = options.createItem;
					},

					open: function (options) {
						this.inUse      = true;
						this.title      = options.title;
						this.items      = options.items;
						this.selectItem = options.selectItem;
					},

					close: function () {
						this.inUse                     = false;
						// this.title                  = '';
						// this.items                  = [];
						// this.selectItem             = function () {};
						this.selectedItem              = null;

						this.createItemButton.inUse    = false;
						// this.createItemButton.title = '';
						// this.createItem             = function () {};
					}
				},

				blogMode: function ($scope) {
					var that    = this;
					var sideBar = this.model;

					var ignoreLocationChangeStart;

					$http.get('/api/blog').success(function (res) {
						var blogs = res;

						sideBar.open({
							title: 'Blogs',
							items: blogs,
							selectItem: that.selectBlog
						});

						// master blog
						if ($location.path() === '/master/blog') {
							sideBar.allowCreation({
								title: 'New Blog',
								createItem: that.createBlog
							});
						}

						if (blogs.length) {
							var blogTitles = blogs.map(function (b) {
								return b.title;
							});

							if ($routeParams.title && !!~blogTitles.indexOf($routeParams.title)) {
								sideBar.selectItem(blogs[blogTitles.indexOf($routeParams.title)]);
							} else {
								sideBar.selectItem(blogs[0]);
							}
						}
					});

					ignoreLocationChangeStart = $scope.$on('$locationChangeStart', function (evt, next, current) {
						sideBar.close();
						ignoreLocationChangeStart();
					});
				},

				createBlog: function () {
					var newBlog = {
						title: 'New Blog',
						content: 'New Entry',
						creationDate: new Date(),
						isNew: true
					};

					this.items.push(newBlog);
					this.selectItem(newBlog);
				},

				selectBlog: function (blog) { // this function varies based on the side bar's content
					var splitPath = $location.path().split('/');
					var firstPath = splitPath[1];

					if (!blog.content) { // if not already fetched
						$http.get('/api/blog/' + blog.title).success(function (res) {
							blog.category     = res.category;
							blog.content      = res.content;
							blog.creationDate = res.creationDate;
						});
					}

					this.selectedItem = blog;

					if (firstPath === 'master' && splitPath.length > 3 || firstPath === 'blog' && splitPath.length > 2) {
						splitPath.pop();
					}

					splitPath.push(blog.title);
					$location.path(splitPath.join('/'));
				}
			};
		}
	];
});