// all services

define([
	'angular',

	'./navbarsvc',
	'./sidebarsvc'
], function (ng, navBarSvc, sideBarSvc) {
	'use strict';

	// to-do: use [].slice.call(args)
	return ng.module('allServices', [])
		.factory('navBarSvc', navBarSvc)
		.factory('sideBarSvc', sideBarSvc);
});