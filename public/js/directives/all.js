// all directives

define([
	'angular',

	'./onload',

	'./widgets/bgimage',
	'./widgets/buttonbar',
	'./widgets/combobox',
	'./widgets/modaldialog',
	'./widgets/modalimage',
	'./widgets/modalselector',
	'./widgets/navbar',
	'./widgets/sidebar'
], function (ng, onLoad, bgImage, buttonBar, comboBox, modalDialog, modalImage, modalSelector, navBar, sideBar) {
	'use strict';

	// to-do: use [].slice.call(args)
	return ng.module('allDirectives', [])
		.directive('uiOnLoad', onLoad)

		.directive('uiBgImage', bgImage)
		.directive('uiButtonBar', buttonBar)
		.directive('uiComboBox', comboBox)
		.directive('uiModalDialog', modalDialog)
		.directive('uiModalImage', modalImage)
		.directive('uiModalSelector', modalSelector)
		.directive('uiNavBar', navBar)
		.directive('uiSideBar', sideBar);
});