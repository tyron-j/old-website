// all directives

define([
	'angular',

	'./widgets/buttonbar',
	'./widgets/navbar',
	'./widgets/sidebar'
], function (ng, buttonBar, navBar, sideBar) {
	'use strict';

	// to-do: use [].slice.call(args)
	return ng.module('allDirectives', [])
		.directive('uiButtonBar', buttonBar)
		.directive('uiNavBar', navBar)
		.directive('uiSideBar', sideBar);
});