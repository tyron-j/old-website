// button bar service

define(function () {
	'use strict';

	return [
		'$http',

		'sideBarSvc',

		function ($http, sideBarSvc) { // use as factory... or service?
			var sideBar = sideBarSvc.model;
			var blogEditor = { // singleton
				inEditMode: false,

				items: [{
					title: 'Save',
					icon: 'save',
					hidden: true,

					onClick: function () {
						var blog = sideBar.selectedItem;
						
						blog.originalTitle   = null;
						blog.originalContent = null

						blogEditor.inEditMode      = false;
						blogEditor.items[3].hidden = true;
						this.hidden                = true;

						$http.post('/api/blog', {
							title: blog.title,
							content: blog.content,
							creationDate: blog.creationDate,
							isNew: blog.isNew
						}).success(function (res) {
							console.log(res.msg);

							blog.isNew = false;
						});
					}
				}, {
					title: 'Edit',
					icon: 'pencil',
					hidden: false,

					onClick: function () {
						var blog = sideBar.selectedItem;

						blog.originalTitle         = blog.title;
						blog.originalContent       = blog.content;
						blogEditor.inEditMode      = true;
						blogEditor.items[0].hidden = false;
						blogEditor.items[3].hidden = false;
					}
				}, {
					title: 'Delete',
					icon: 'trash',
					hidden: false,

					onClick: function () {
						var blog = sideBar.selectedItem;
					}
				}, {
					title: 'Cancel',
					icon: 'close',
					hidden: true,

					onClick: function () {
						var blog = sideBar.selectedItem;

						blog.title           = blog.originalTitle;
						blog.content         = blog.originalContent;
						blog.originalTitle   = null;
						blog.originalContent = null

						blogEditor.inEditMode      = false;
						blogEditor.items[0].hidden = true;
						this.hidden                = true;
					}
				}]
			};

			return {
				blogEditor: blogEditor
			};
		}
	];
});