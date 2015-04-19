// all directives

define([
	'angular',

	'./widgets/navbar',
	'./widgets/sidebar'
], function (ng, navBar, sideBar) {
	'use strict';

	// to-do: use [].slice.call(args)
	return ng.module('allDirectives', [])
		.directive('navBar', navBar)
		.directive('sideBar', sideBar);
});