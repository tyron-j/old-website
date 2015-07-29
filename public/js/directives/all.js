// all directives

define([
	'angular',

	'./widgets/bgimage',
	'./widgets/buttonbar',
	'./widgets/modaldialog',
	'./widgets/modalimage',
	'./widgets/navbar',
	'./widgets/sidebar'
], function (ng, bgImage, buttonBar, modalDialog, modalImage, navBar, sideBar) {
	'use strict';

	// to-do: use [].slice.call(args)
	return ng.module('allDirectives', [])
		.directive('uiBgImage', bgImage)
		.directive('uiButtonBar', buttonBar)
		.directive('uiModalDialog', modalDialog)
		.directive('uiModalImage', modalImage)
		.directive('uiNavBar', navBar)
		.directive('uiSideBar', sideBar);
});