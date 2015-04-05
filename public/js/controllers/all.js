// all controllers

define([
	'angular',

	'./loginctrl',
	'./galleryctrl',
	'./blogctrl',

	'./master/blogctrl'
], function (ng, LoginCtrl, GalleryCtrl, BlogCtrl, MasterBlogCtrl) {
	'use strict';

	// to-do: use [].slice.call(args)
	return ng.module('allControllers', [])
		.controller('LoginCtrl', LoginCtrl)
		.controller('GalleryCtrl', GalleryCtrl)
		.controller('BlogCtrl', BlogCtrl)
		
		.controller('MasterBlogCtrl', MasterBlogCtrl);
});