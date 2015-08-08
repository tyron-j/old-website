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
	'./specialctrl',

	'./master/homectrl',
	'./master/aboutctrl',
	'./master/blogctrl',
	'./master/galleryctrl',
	'./master/resumectrl',

	'./tests/uictrl',
	'./tests/unitctrl',

	'services/all'
], function (ng, MainCtrl, LoginCtrl, HomeCtrl, AboutCtrl, BlogCtrl, GalleryCtrl, NovelCtrl, ResumeCtrl, SpecialCtrl, MasterHomeCtrl, MasterAboutCtrl, MasterBlogCtrl, MasterGalleryCtrl, MasterResumeCtrl, UICtrl, UnitCtrl) {
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
		.controller('SpecialCtrl', SpecialCtrl)
		
		.controller('MasterHomeCtrl', MasterHomeCtrl)
		.controller('MasterAboutCtrl', MasterAboutCtrl)
		.controller('MasterBlogCtrl', MasterBlogCtrl)
		.controller('MasterGalleryCtrl', MasterGalleryCtrl)
		.controller('MasterResumeCtrl', MasterResumeCtrl)

		.controller('UICtrl', UICtrl)
		.controller('UnitCtrl', UnitCtrl);
});