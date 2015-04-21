// all services

define([
	'angular',

	'./buttonbarsvc',
	'./navbarsvc',
	'./sidebarsvc'
], function (ng, buttonBarSvc, navBarSvc, sideBarSvc) {
	'use strict';

	// to-do: use [].slice.call(args)
	return ng.module('allServices', [])
		.factory('buttonBarSvc', buttonBarSvc)
		.factory('navBarSvc', navBarSvc)
		.factory('sideBarSvc', sideBarSvc);
});