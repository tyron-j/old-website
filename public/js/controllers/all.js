// all controllers

define([
	'angular',

	'./loginctrl',
	'./galleryctrl',
	'./blogctrl',

	'./master/galleryctrl',
	'./master/blogctrl'
], function (ng, LoginCtrl, GalleryCtrl, BlogCtrl, MasterGalleryCtrl, MasterBlogCtrl) {
	'use strict';

	// to-do: use [].slice.call(args)
	return ng.module('allControllers', [])
		.controller('LoginCtrl', LoginCtrl)
		.controller('GalleryCtrl', GalleryCtrl)
		.controller('BlogCtrl', BlogCtrl)
		
		.controller('MasterGalleryCtrl', MasterGalleryCtrl)
		.controller('MasterBlogCtrl', MasterBlogCtrl);
});