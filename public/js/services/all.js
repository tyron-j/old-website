// all services

define([
	'angular',

	'./bgimagesvc',
	'./buttonbarsvc',
	'./modaldialogsvc',
	'./modalimagesvc',
	'./navbarsvc',
	'./sidebarsvc'
], function (ng, bgImageSvc, buttonBarSvc, modalDialogSvc, modalImageSvc, navBarSvc, sideBarSvc) {
	'use strict';

	// to-do: use [].slice.call(args)
	return ng.module('allServices', [])
		.factory('bgImageSvc', bgImageSvc)
		.factory('buttonBarSvc', buttonBarSvc)
		.factory('modalDialogSvc', modalDialogSvc)
		.factory('modalImageSvc', modalImageSvc)
		.factory('navBarSvc', navBarSvc)
		.factory('sideBarSvc', sideBarSvc);
});