// all services

define([
	'angular',

	'./bgimagesvc',
	'./buttonbarsvc',
	'./comboboxsvc',
	'./modaldialogsvc',
	'./modalimagesvc',
	'./modalselectorsvc',
	'./navbarsvc',
	'./sidebarsvc'
], function (ng, bgImageSvc, buttonBarSvc, comboBoxSvc, modalDialogSvc, modalImageSvc, modalSelectorSvc, navBarSvc, sideBarSvc) {
	'use strict';

	// to-do: use [].slice.call(args)
	return ng.module('allServices', [])
		.factory('bgImageSvc', bgImageSvc)
		.factory('buttonBarSvc', buttonBarSvc)
		.factory('comboBoxSvc', comboBoxSvc)
		.factory('modalDialogSvc', modalDialogSvc)
		.factory('modalImageSvc', modalImageSvc)
		.factory('modalSelectorSvc', modalSelectorSvc)
		.factory('navBarSvc', navBarSvc)
		.factory('sideBarSvc', sideBarSvc);
});