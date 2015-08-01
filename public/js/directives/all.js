// all directives

define([
	'angular',

	'./widgets/bgimage',
	'./widgets/buttonbar',
	'./widgets/combobox',
	'./widgets/modaldialog',
	'./widgets/modalimage',
	'./widgets/navbar',
	'./widgets/sidebar'
], function (ng, bgImage, buttonBar, comboBox, modalDialog, modalImage, navBar, sideBar) {
	'use strict';

	// to-do: use [].slice.call(args)
	return ng.module('allDirectives', [])
		.directive('uiBgImage', bgImage)
		.directive('uiButtonBar', buttonBar)
		.directive('uiComboBox', comboBox)
		.directive('uiModalDialog', modalDialog)
		.directive('uiModalImage', modalImage)
		.directive('uiNavBar', navBar)
		.directive('uiSideBar', sideBar);
});