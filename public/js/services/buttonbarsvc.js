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

			var blogEditor = { // singleton; to-do: use an instance
				inEditMode: false,

				enterEditMode: function () {
					var blog = sideBar.selectedItem;

					blog.originalTitle   = blog.title;
					blog.originalContent = blog.content;

					this.inEditMode      = true;
					this.items[0].hidden = false;
					this.items[3].hidden = false;
				},

				exitEditMode: function (resetBlog) {
					var blog = sideBar.selectedItem;

					if (resetBlog) {
						blog.title   = blog.originalTitle;
						blog.content = blog.originalContent;
					}

					blog.originalTitle   = null;
					blog.originalContent = null;

					this.inEditMode      = false;
					this.items[0].hidden = true;
					this.items[3].hidden = true;
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

			return {
				blogEditor: blogEditor
			};
		}
	];
});