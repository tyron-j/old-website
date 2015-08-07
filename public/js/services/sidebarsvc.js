// side bar service

define(function () {
	'use strict';

	return [
		'$http',
		'$location',
		'$routeParams',

		'bgImageSvc',

		function ($http, $location, $routeParams, bgImageSvc) { // use as factory
			var bgImage = bgImageSvc.model;

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

					var ignoreBgImageTitleChange;
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

							bgImage.open('blog');

							if ($routeParams.title && !!~blogTitles.indexOf($routeParams.title)) {
								sideBar.selectItem(blogs[blogTitles.indexOf($routeParams.title)]);
							} else {
								sideBar.selectItem(blogs[0]);
							}
						}
					});

					ignoreBgImageTitleChange = $scope.$watch('sideBar.selectedItem.bgImageTitle', function (newValue, oldValue) {
						bgImage.imageTitle = newValue;
					});

					ignoreLocationChangeStart = $scope.$on('$locationChangeStart', function (evt, next, current) {
						sideBar.close();
						bgImage.close();
						ignoreBgImageTitleChange();
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

					this.items.unshift(newBlog);
					this.selectItem(newBlog);
				},

				selectBlog: function (blog) { // this function varies based on the side bar's content
					if (!blog.content) { // if not already fetched
						$http.get('/api/blog/' + blog.title).success(function (res) {
							blog.category     = res.category;
							blog.content      = res.content;
							blog.bgImageTitle = res.bgImageTitle;
							blog.creationDate = res.creationDate;
						});
					}

					this.selectedItem = blog;
				}
			};
		}
	];
});