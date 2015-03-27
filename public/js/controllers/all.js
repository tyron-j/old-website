// all controllers

define([
	'angular',
	'./loginctrl',
	'./galleryctrl'
], function (ng, LoginCtrl, GalleryCtrl) {
	'use strict';

	// to-do: use [].slice.call(args)
	return ng.module('allControllers', [])
		.controller('LoginCtrl', LoginCtrl)
		.controller('GalleryCtrl', GalleryCtrl);
});