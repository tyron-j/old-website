// all controllers

define([
	'angular',
	'./loginctrl'
], function (ng, LoginCtrl) {
	'use strict';

	// to-do: use [].slice.call(args)
	return ng.module('allControllers', [])
		.controller('LoginCtrl', LoginCtrl);
});