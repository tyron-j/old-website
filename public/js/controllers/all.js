// all controllers

define([
	'angular',

	'./mainctrl',

	'./loginctrl',

	'./aboutctrl',
	'./blogctrl',
	'./galleryctrl',
	'./resumectrl',

	'./master/galleryctrl',
	'./master/blogctrl',

	'./tests/uictrl',
	'./tests/unitctrl',

	'services/all'
], function (ng, MainCtrl, LoginCtrl, AboutCtrl, BlogCtrl, GalleryCtrl, ResumeCtrl, MasterGalleryCtrl, MasterBlogCtrl, UICtrl, UnitCtrl) {
	'use strict';

	// to-do: use [].slice.call(args)
	return ng.module('allControllers', [ 'allServices' ])
		.controller('MainCtrl', MainCtrl)

		.controller('LoginCtrl', LoginCtrl)

		.controller('AboutCtrl', AboutCtrl)
		.controller('BlogCtrl', BlogCtrl)
		.controller('GalleryCtrl', GalleryCtrl)
		.controller('ResumeCtrl', ResumeCtrl)
		
		.controller('MasterGalleryCtrl', MasterGalleryCtrl)
		.controller('MasterBlogCtrl', MasterBlogCtrl)

		.controller('UICtrl', UICtrl)
		.controller('UnitCtrl', UnitCtrl);
});