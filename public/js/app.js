// app

define([
	'angular',
	'angular-animate', // to-do: consider removing ngAnimate
	'angular-route',
	'controllers/all',
	'directives/all'
], function (ng) { // only need the first argument
	'use strict';

	var app = ng.module('tyronApp', [
		'ngAnimate', // to-do: consider removing ngAnimate
		'ngRoute',
		'allControllers',
		'allDirectives'
	]).config([
		'$routeProvider',
		'$locationProvider',

		function ($routeProvider, $locationProvider) {
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
		}
	]);

	ng.bootstrap(document, ['tyronApp'], {
		strictDi: true
	});

	return app;
});