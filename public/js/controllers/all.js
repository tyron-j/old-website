// all controllers

define([
	'angular',
	'./loginctrl'
], function (ng, LoginCtrl) {
	'use strict';

	return ng.module('allControllers', [])
		.controller('LoginCtrl', LoginCtrl);
});