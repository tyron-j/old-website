// all controllers

define([
	'angular',

	'./mainctrl',

	'./loginctrl',
	'./galleryctrl',
	'./blogctrl',

	'./master/galleryctrl',
	'./master/blogctrl',

	'services/all'
], function (ng, MainCtrl, LoginCtrl, GalleryCtrl, BlogCtrl, MasterGalleryCtrl, MasterBlogCtrl) {
	'use strict';

	// to-do: use [].slice.call(args)
	return ng.module('allControllers', [ 'allServices' ])
		.controller('MainCtrl', MainCtrl)

		.controller('LoginCtrl', LoginCtrl)
		.controller('GalleryCtrl', GalleryCtrl)
		.controller('BlogCtrl', BlogCtrl)
		
		.controller('MasterGalleryCtrl', MasterGalleryCtrl)
		.controller('MasterBlogCtrl', MasterBlogCtrl);
});