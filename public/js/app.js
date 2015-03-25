// app

define([
	'angular',
	'angular-route',
	'controllers/all'
], function (ng) { // only need the first argument
	'use strict';

	var app = ng.module('tyronApp', [
		'ngRoute',
		'allControllers'
	]).config(function ($routeProvider, $locationProvider) { // minification errors?
		// public routes
		$routeProvider.when('/login', {
			templateUrl: '/partials/login',
			controller: 'LoginCtrl'
		}).when('/hello', {
			templateUrl: '/partials/hello'
		}).when('/unauthorized', {
			templateUrl: '/partials/unauthorized'
		}).when('/success', {
			templateUrl: '/partials/success'
		});

		// master routes
		$routeProvider.when('/master/upload', {
			templateUrl: '/partials/master/upload'
		});

		// otherwise
		$routeProvider.otherwise({
			redirectTo: '/login'
		});

		$locationProvider.html5Mode(true);
	});

	ng.bootstrap(document, ['tyronApp']);

	return app;
});