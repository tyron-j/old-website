// button bar service

define(function () {
	'use strict';

	return [
		'$http',
		'$timeout',

		'bgImageSvc',
		'modalDialogSvc',
		'modalImageSvc',
		'modalSelectorSvc',
		'sideBarSvc',

		function ($http, $timeout, bgImageSvc, modalDialogSvc, modalImageSvc, modalSelectorSvc, sideBarSvc) { // use as factory... or service?
			var bgImage       = bgImageSvc.model;
			var modalDialog   = modalDialogSvc.model;
			var modalImage    = modalImageSvc.model;
			var modalSelector = modalSelectorSvc.model;
			var sideBar       = sideBarSvc.model;

			var triggerEvent = function (element, eventType) {
				var evt = new Event(eventType);
				element.dispatchEvent(evt);
			};

			return {
				// to-do: consider keeping the widget models as separate files and fetching them through require.js
				getImageThumbnailEditor: function ($scope) {
					return {
						items: [{
							title: 'Expand',
							icon: 'expand',

							onClick: function () {
								modalImage.open($scope.inspectedImage.title, $scope.inspectedImage.category);
								$scope.inspectedImage = null; // close thumbnail editor
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
								var images            = $scope.images;
								var imageBeingDeleted = $scope.inspectedImage;

								modalDialog.open({
									title: 'Delete Confirmation',
									content: "Are you sure you want to delete " + imageBeingDeleted.title + "?",
									buttons: [{
										title: 'OK',
										onClick: function () {
											$http.delete('/api/image/' + imageBeingDeleted.category + '/' + imageBeingDeleted.title).then(function (res) {
												console.log(res.data.msg);
												images.splice(images.indexOf(imageBeingDeleted), 1);
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
						}]
					};
				},

				getImageBrowserEditor: function ($scope) {
					// to-do: consider using FileReader instead along with drag & drop logic
					var fileInput   = document.getElementById('fileInput');
					var submitInput = document.getElementById('submitInput');

					// to-do: disallow uploading an image with a duplicate title in either of the uploaded or uploading lists
					fileInput.addEventListener('change', function (evt) {
						if (fileInput.files.length) {
							var fileNames = [].slice.call(fileInput.files).map(function (file) {
								return file.name;
							});

							// workaround for strange bug causing modal dialog to open only after mouseout is triggered on image browser
							$timeout(function () {
								modalDialog.open({
									title: 'Upload Confirmation',
									content: "You are about to upload:\n\n" + fileNames.join('\n'),
									buttons: [{
										title: 'OK',
										onClick: function () {
											triggerEvent(submitInput, 'click');
										}
									}, {
										title: 'Cancel',
										onClick: function () {
											modalDialog.close();
											fileInput.value = ''; // reset field
										}
									}]
								});
							});
						}
					});

					// to-do: consider implementing collections of images
					return {
						items: [{
							// to-do: make the actual input tag invisible and bind it to a custom button
							title: 'Upload',
							icon: 'upload',

							onClick: function () {
								triggerEvent(fileInput, 'click');
							}
						}, {
							title: 'Select All',
							icon: 'check-circle',

							onClick: function () {
								$scope.images.forEach(function (image) {
									image.selected = true;
								});
							}
						}, {
							title: 'Unselect All',
							icon: 'check-circle-o',

							onClick: function () {
								$scope.images.forEach(function (image) {
									image.selected = false;
								});
							}
						}, {
							// to-do: show the delete button only if there is a selected image
							title: 'Delete Selected',
							icon: 'trash',

							onClick: function () {
								var images              = $scope.images;
								var selectedImages      = images.filter(function (image) { return image.selected; });
								var selectedImageTitles = selectedImages.map(function (image) { return image.title; });

								if (selectedImages.length) {
									modalDialog.open({
										title: 'Delete Confirmation',
										content: "Are you sure you want to delete the selected images?\n\n" + selectedImageTitles.join('\n'),
										buttons: [{
											title: 'OK',
											onClick: function () {
												var count = 0;

												selectedImages.forEach(function (image) {
													$http.delete('/api/image/' + image.category + '/' + image.title).then(function (res) {
														console.log(res.data.msg);
														images.splice(images.indexOf(image), 1);
														count++;

														if (count === selectedImages.length) {
															modalDialog.close();
														}
													});
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
							var blog     = sideBar.selectedItem;
							var comboBox = $scope.comboBox;
							var that     = this;

							blog.originalTitle        = blog.title;
							blog.originalContent      = blog.content;
							blog.originalBgImageTitle = blog.bgImageTitle;

							this.inEditMode      = true;
							this.items[0].hidden = false;
							this.items[1].hidden = false;
							this.items[2].hidden = true;
							this.items[4].hidden = false;

							if (blog.category) {
								comboBox.selectedItem = blog.category;
							}

							ignoreLocationChangeStart = $scope.$on('$locationChangeStart', function (evt, next, current) {
								that.exitEditMode(true, blog); // to-do: change this in accordance with changes made to side bar deconstruction
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
								blog.title        = blog.originalTitle;
								blog.content      = blog.originalContent;
								blog.bgImageTitle = blog.originalBgImageTitle;
							}

							blog.originalTitle        = null;
							blog.originalContent      = null;
							blog.originalBgImageTitle = null;

							this.inEditMode      = false;
							this.items[0].hidden = true;
							this.items[1].hidden = true;
							this.items[2].hidden = false;
							this.items[4].hidden = true;

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

								var comboBox = $scope.comboBox;
								var category = comboBox.selectedItem;

								if (blogTitles.indexOf(blog.title) === blogTitles.lastIndexOf(blog.title)) { // unique title
									blogEditor.exitEditMode();

									if (blog.isNew) {
										$http.post('/api/blog', {
											category: category,
											title: blog.title,
											content: blog.content,
											bgImageTitle: blog.bgImageTitle,
											creationDate: blog.creationDate
										}).then(function (res) {
											console.log(res.data.msg);

											blog.isNew = false;
										});
									} else {
										$http.put('/api/blog', {
											category: category,
											title: blog.title,
											content: blog.content,
											bgImageTitle: blog.bgImageTitle,
											creationDate: blog.creationDate
										}).then(function (res) {
											console.log(res.data.msg);
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
							title: 'Background',
							icon: 'picture-o',
							hidden: true,

							onClick: function () {
								var blog = sideBar.selectedItem;

								$http.get('/api/image/blog').then(function (res) {
									modalSelector.open(res.data, [{
										title: 'OK',
										onClick: function () {
											if (modalSelector.selectedImage) {
												blog.bgImageTitle = modalSelector.selectedImage.title;

												modalSelector.close();
											}
										}
									}, {
										title: 'Cancel',
										onClick: function () {
											modalSelector.close();
										}
									}]);
								});
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
									title: 'Delete Confirmation',
									content: "Are you sure you wish to delete " + blog.title + "?",
									buttons: [{
										title: 'OK',
										onClick: function () {
											if (blog.isNew) {
												blogs.splice(blogs.indexOf(blog), 1);
												sideBar.selectItem(blogs[0]);
												modalDialog.close();
											} else {
												$http.delete('/api/blog/' + blog.title).then(function (res) {
													console.log(res.data.msg);
													blogs.splice(blogs.indexOf(blog), 1);
													sideBar.selectItem(blogs[0]);
													modalDialog.close();
												});
											}
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
				},

				resumeMenu: {
					items: [{
						title: 'PDF',
						icon: 'print',

						onClick: function () {
							console.log("Downloading PDF!");
						}
					}]
				},

				getNewsListItemAdder: function ($scope) {
					var ContentButtonBar = this.NewsListContentEditor;

					return {
						items: [{
							title: 'Add',
							icon: 'plus',

							onClick: function () {
								var newItem = {
									href: '',
									imageTitle: '',
									creationDate: new Date(),
									isNew: true
								};

								newItem.buttonBar = new ContentButtonBar($scope, newItem);

								$scope.newsListItems.unshift(newItem);
							}
						}]
					};
				},

				NewsListContentEditor: function ($scope, newsListItem) { // constructor
					var that = this;

					this.enterEditMode = function () {
						this.items[0].hidden = false;
						this.items[1].hidden = false;
						this.items[2].hidden = true;
						this.items[4].hidden = false;

						newsListItem.inEditMode = true;

						if ($scope.itemBeingEdited && $scope.itemBeingEdited !== newsListItem) { // only allow one item to be edited at a time
							$scope.itemBeingEdited.buttonBar.exitEditMode();
						}

						$scope.itemBeingEdited = newsListItem;

						newsListItem.originalHref       = newsListItem.href;
						newsListItem.originalImageTitle = newsListItem.imageTitle;
					};

					this.exitEditMode = function (cancel) {
						this.items[0].hidden = true;
						this.items[1].hidden = true;
						this.items[2].hidden = false;
						this.items[4].hidden = true;

						newsListItem.inEditMode = false;

						if (cancel) {
							newsListItem.href       = newsListItem.originalHref;
							newsListItem.imageTitle = newsListItem.originalImageTitle;
						}

						newsListItem.originalHref       = null;
						newsListItem.originalImageTitle = null;
					};

					this.items = [{
						title: 'Save',
						icon: 'save',
						hidden: true,

						onClick: function () {
							that.exitEditMode();

							if (newsListItem.isNew) {
								$http.post('/api/news', {
									href: newsListItem.href,
									imageTitle: newsListItem.imageTitle,
									creationDate: newsListItem.creationDate
								}).then(function (res) {
									console.log(res.data.msg);

									newsListItem.isNew = false;
								});
							} else {
								$http.put('/api/news', {
									href: newsListItem.href,
									imageTitle: newsListItem.imageTitle,
									creationDate: newsListItem.creationDate
								}).then(function (res) {
									console.log(res.data.msg);
								});
							}
						}
					}, {
						title: 'Image',
						icon: 'picture-o',
						hidden: true,

						onClick: function () {
							$http.get('/api/image/home').then(function (res) {
								modalSelector.open(res.data, [{
									title: 'OK',
									onClick: function () {
										if (modalSelector.selectedImage) {
											newsListItem.imageTitle = modalSelector.selectedImage.title;

											modalSelector.close();
										}
									}
								}, {
									title: 'Cancel',
									onClick: function () {
										modalSelector.close();
									}
								}]);
							});
						}
					}, {
						title: 'Edit',
						icon: 'pencil',

						onClick: function () {
							that.enterEditMode();
						}
					}, {
						title: 'Delete',
						icon: 'trash',

						onClick: function () {
							var newsListItems = $scope.newsListItems;

							modalDialog.open({
								title: 'Delete Confirmation',
								content: "Are you sure you wish to delete news: " + newsListItem.imageTitle + "?",
								buttons: [{
									title: 'OK',
									onClick: function () {
										if (newsListItem.isNew) {
											newsListItems.splice(newsListItems.indexOf(newsListItem), 1);
											modalDialog.close();
										} else {
											$http.delete('/api/news/' + newsListItem.imageTitle).then(function (res) {
												console.log(res.data.msg);
												newsListItems.splice(newsListItems.indexOf(newsListItem), 1);
												modalDialog.close();
											});
										}
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
							that.exitEditMode(true);
						}
					}];
				}
			};
		}
	];
});