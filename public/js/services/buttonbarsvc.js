// button bar service

define(function () {
	'use strict';

	return [
		'$http',

		'modalDialogSvc',
		'sideBarSvc',

		function ($http, modalDialogSvc, sideBarSvc) { // use as factory... or service?
			var modalDialog = modalDialogSvc.model;
			var sideBar     = sideBarSvc.model;

			return {
				getBlogEditor: function ($scope) {
					var ignoreLocationChangeStart;
					var ignoreSideBarSelectionChange;

					var blogEditor = { // singleton; to-do: use an instance
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
								var blog = sideBar.selectedItem;

								blogEditor.exitEditMode();

								// to-do: check for duplicate title first
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
								var blog = sideBar.selectedItem;

								modalDialog.open({
									title: 'Confirmation',
									content: "Are you sure you wish to delete this blog?",
									buttons: [{
										title: 'OK',
										onClick: function () {
											$http.delete('/api/blog/' + blog.title).success(function (res) {
												console.log(res.msg);
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