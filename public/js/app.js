// app

define([
	'angular',
	'angular-animate',
	'angular-route',
	'controllers/all'
], function (ng) { // only need the first argument
	'use strict';

	var app = ng.module('tyronApp', [
		'ngAnimate',
		'ngRoute',
		'allControllers'
	]).config(function ($routeProvider, $locationProvider) { // minification errors?
		// public routes
		$routeProvider.when('/login', {
			templateUrl: '/partials/login',
			controller: 'LoginCtrl'
		}).when('/gallery', { // currently localhost only
			templateUrl: '/partials/gallery',
			controller: 'GalleryCtrl'
		}).when('/blog', { // currently localhost only
			templateUrl: '/partials/blog',
			controller: 'BlogCtrl'
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
		}).when('/master/gallery', {
			templateUrl: '/partials/master/gallery',
			controller: 'MasterGalleryCtrl'
		}).when('/master/blog', {
			templateUrl: '/partials/master/blog',
			controller: 'MasterBlogCtrl'
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