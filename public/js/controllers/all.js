// all controllers

define([
	'angular',

	'./mainctrl',

	'./loginctrl',

	'./homectrl',
	'./aboutctrl',
	'./blogctrl',
	'./galleryctrl',
	'./novelctrl',
	'./resumectrl',

	'./master/galleryctrl',
	'./master/blogctrl',

	'./tests/uictrl',
	'./tests/unitctrl',

	'services/all'
], function (ng, MainCtrl, LoginCtrl, HomeCtrl, AboutCtrl, BlogCtrl, GalleryCtrl, NovelCtrl, ResumeCtrl, MasterGalleryCtrl, MasterBlogCtrl, UICtrl, UnitCtrl) {
	'use strict';

	// to-do: use [].slice.call(args)
	return ng.module('allControllers', [ 'allServices' ])
		.controller('MainCtrl', MainCtrl)

		.controller('LoginCtrl', LoginCtrl)

		.controller('HomeCtrl', HomeCtrl)
		.controller('AboutCtrl', AboutCtrl)
		.controller('BlogCtrl', BlogCtrl)
		.controller('GalleryCtrl', GalleryCtrl)
		.controller('NovelCtrl', NovelCtrl)
		.controller('ResumeCtrl', ResumeCtrl)
		
		.controller('MasterGalleryCtrl', MasterGalleryCtrl)
		.controller('MasterBlogCtrl', MasterBlogCtrl)

		.controller('UICtrl', UICtrl)
		.controller('UnitCtrl', UnitCtrl);
});