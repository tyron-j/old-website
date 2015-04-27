// all services

define([
	'angular',

	'./buttonbarsvc',
	'./modaldialogsvc',
	'./navbarsvc',
	'./sidebarsvc'
], function (ng, buttonBarSvc, modalDialogSvc, navBarSvc, sideBarSvc) {
	'use strict';

	// to-do: use [].slice.call(args)
	return ng.module('allServices', [])
		.factory('buttonBarSvc', buttonBarSvc)
		.factory('modalDialogSvc', modalDialogSvc)
		.factory('navBarSvc', navBarSvc)
		.factory('sideBarSvc', sideBarSvc);
});