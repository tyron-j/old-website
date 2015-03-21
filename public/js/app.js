// app

define([
	'angular',
	'angular-route',
	'controllers/all'
], function (ng, ngRoute, controllers) {
	'use strict';

	var app = ng.module('tyronApp', [
		'ngRoute',
		'allControllers'
	]).config(function ($routeProvider, $locationProvider) { // minification errors?
		$routeProvider.when('/login', {
			templateUrl: 'partials/login',
			controller: 'LoginCtrl'
		}).when('/success', {
			templateUrl: 'partials/success'
		}).when('/fail', {
			templateUrl: 'partials/fail'
		});

		$locationProvider.html5Mode(true);
	});

	ng.bootstrap(document, ['tyronApp']);

	return app;
});