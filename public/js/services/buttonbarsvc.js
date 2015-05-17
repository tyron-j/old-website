// button bar service

define(function () {
	'use strict';

	return [
		'$http',

		'modalDialogSvc',
		'modalImageSvc',
		'sideBarSvc',

		function ($http, modalDialogSvc, modalImageSvc, sideBarSvc) { // use as factory... or service?
			var modalDialog = modalDialogSvc.model;
			var modalImage  = modalImageSvc.model;
			var sideBar     = sideBarSvc.model;

			return {
				// to-do: consider keeping the widget models as separate files and fetching them through require.js
				getArtworkThumbnailEditor: function ($scope) {
					return {
						items: [{
							title: 'Expand',
							icon: 'expand',

							onClick: function () {
								modalImage.open($scope.inspectedArtwork.title);
								$scope.inspectedArtwork = null; // close thumbnail editor
							}
						}, {
							title: 'Edit',
							icon: 'pencil',

							onClick: function () {
								console.log("Edit pressed!");
							}
						}, {
							title: 'Delete',
							icon: 'trash',

							onClick: function () {
								console.log("Delete pressed!");
							}
						}]
					};
				},

				getArtworkBrowserEditor: function ($scope) {
					return {
						items: [{
							// to-do: make the actual input tag invisible and bind it to a custom button
							title: 'Upload',
							icon: 'upload',

							onClick: function () {
								console.log("Upload pressed!");
							}
						}, {
							title: 'Select All',
							icon: 'check-circle',

							onClick: function () {
								console.log("Selecting all artworks!");
							}
						}, {
							title: 'Unselect All',
							icon: 'check-circle-o',

							onClick: function () {
								console.log("Unselecting all artworks!");
							}
						}, {
							// to-do: show the delete button only if there is a selected artwork
							title: 'Delete Selected',
							icon: 'trash',

							onClick: function () {
								console.log("Deleting selected artworks!");
							}
						}]
					};
				},

				getBlogEditor: function ($scope) {
					var ignoreLocationChangeStart;
					var ignoreSideBarSelectionChange;

					var blogEditor = { // singleton; to-do: consider using an instance
						inEditMode: false,

						enterEditMode: function () {
							var blog = sideBar.selectedItem;
							var that = this;

							blog.originalTitle   = blog.title;
							blog.originalContent = blog.content;

							this.inEditMode      = true;
							this.items[0].hidden = false;
							this.items[3].hidden = false;

							ignoreLocationChangeStart = $scope.$on('$locationChangeStart', function (evt, next, current) {
								that.exitEditMode(true); // to-do: change this in accordance with changes made to side bar deconstruction
							});

							// watch creationDate since it uniquely identifies blog
							ignoreSideBarSelectionChange = $scope.$watch('sideBar.selectedItem.creationDate', function (newValue, oldValue) {
								if (newValue !== oldValue) {
									that.exitEditMode(true, blog);
								}
							});
						},

						exitEditMode: function (resetBlog, currentBlog) {
							var blog = currentBlog || sideBar.selectedItem;

							if (resetBlog) {
								blog.title   = blog.originalTitle;
								blog.content = blog.originalContent;
							}

							blog.originalTitle   = null;
							blog.originalContent = null;

							this.inEditMode      = false;
							this.items[0].hidden = true;
							this.items[3].hidden = true;

							// these have to be called every time the user exits edit mode
							ignoreLocationChangeStart();
							ignoreSideBarSelectionChange();
						},

						items: [{
							title: 'Save',
							icon: 'save',
							hidden: true,

							onClick: function () {
								var blog       = sideBar.selectedItem;
								var blogs      = sideBar.items;
								var blogTitles = blogs.map(function (b) {
									return b.title;
								});

								if (blogTitles.indexOf(blog.title) === blogTitles.lastIndexOf(blog.title)) { // unique title
									blogEditor.exitEditMode();

									if (blog.isNew) {
										$http.post('/api/blog', {
											title: blog.title,
											content: blog.content,
											creationDate: blog.creationDate
										}).success(function (res) {
											console.log(res.msg);

											blog.isNew = false;
										});
									} else {
										$http.put('/api/blog', {
											title: blog.title,
											content: blog.content,
											creationDate: blog.creationDate
										}).success(function (res) {
											console.log(res.msg);
										});
									}
								} else { // duplicate title
									modalDialog.open({
										title: 'Invalid Action',
										content: "A blog by the same title already exists",
										buttons: [{
											title: 'OK',
											onClick: function () {
												modalDialog.close();
											}
										}]
									});
								}
							}
						}, {
							title: 'Edit',
							icon: 'pencil',
							hidden: false,

							onClick: function () {
								blogEditor.enterEditMode();
							}
						}, {
							title: 'Delete',
							icon: 'trash',
							hidden: false,

							onClick: function () {
								var blog  = sideBar.selectedItem;
								var blogs = sideBar.items;

								modalDialog.open({
									title: 'Confirmation',
									content: "Are you sure you wish to delete this blog?",
									buttons: [{
										title: 'OK',
										onClick: function () {
											$http.delete('/api/blog/' + blog.title).success(function (res) {
												console.log(res.msg);
												blogs.splice(blogs.indexOf(blog), 1);
												sideBar.selectItem(blogs[0]);
												modalDialog.close();
											});
										}
									}, {
										title: 'Cancel',
										onClick: function () {
											modalDialog.close();
										}
									}]
								});
							}
						}, {
							title: 'Cancel',
							icon: 'close',
							hidden: true,

							onClick: function () {
								var blog = sideBar.selectedItem;

								blogEditor.exitEditMode(true);
							}
						}]
					};

					return blogEditor;
				}
			};
		}
	];
});