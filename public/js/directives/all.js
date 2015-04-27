// all directives

define([
	'angular',

	'./widgets/buttonbar',
	'./widgets/modaldialog',
	'./widgets/navbar',
	'./widgets/sidebar'
], function (ng, buttonBar, modalDialog, navBar, sideBar) {
	'use strict';

	// to-do: use [].slice.call(args)
	return ng.module('allDirectives', [])
		.directive('uiButtonBar', buttonBar)
		.directive('uiModalDialog', modalDialog)
		.directive('uiNavBar', navBar)
		.directive('uiSideBar', sideBar);
});