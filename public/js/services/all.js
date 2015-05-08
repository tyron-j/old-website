// all services

define([
	'angular',

	'./buttonbarsvc',
	'./modaldialogsvc',
	'./modalimagesvc',
	'./navbarsvc',
	'./sidebarsvc'
], function (ng, buttonBarSvc, modalDialogSvc, modalImageSvc, navBarSvc, sideBarSvc) {
	'use strict';

	// to-do: use [].slice.call(args)
	return ng.module('allServices', [])
		.factory('buttonBarSvc', buttonBarSvc)
		.factory('modalDialogSvc', modalDialogSvc)
		.factory('modalImageSvc', modalImageSvc)
		.factory('navBarSvc', navBarSvc)
		.factory('sideBarSvc', sideBarSvc);
});