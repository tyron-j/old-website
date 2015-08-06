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
		'$locationProvider',
		'$routeProvider',

		function ($locationProvider, $routeProvider) {
			// public routes
			$routeProvider.when('/login', {
				templateUrl: '/partials/login',
				controller: 'LoginCtrl'
			}).when('/home', {
				templateUrl: '/partials/home',
				controller: 'HomeCtrl'
			}).when('/about', {
				templateUrl: '/partials/about',
				controller: 'AboutCtrl'
			}).when('/blog/:title?', { // currently localhost only
				templateUrl: '/partials/blog',
				controller: 'BlogCtrl'
			}).when('/gallery', { // currently localhost only
				templateUrl: '/partials/gallery',
				controller: 'GalleryCtrl'
			}).when('/novel', {
				templateUrl: '/partials/novel',
				controller: 'NovelCtrl'
			}).when('/resume', {
				templateUrl: '/partials/resume',
				controller: 'ResumeCtrl'
			});

			// temporary routes
			$routeProvider.when('/hello', {
				templateUrl: '/partials/hello'
			}).when('/success', {
				templateUrl: '/partials/success'
			}).when('/unauthorized', {
				templateUrl: '/partials/unauthorized'
			}).when('/danryan', { // just for Dan Ryan
				templateUrl: '/partials/danryan'
			}).when('/facebook', { // just for Facebook
				templateUrl: '/partials/facebook'
			});

			// master routes
			$routeProvider.when('/master/upload', { // to-do: remove this
				templateUrl: '/partials/master/upload'
			}).when('/master/home/', {
				templateUrl: '/partials/master/home',
				controller: 'MasterHomeCtrl'
			}).when('/master/about/', {
				templateUrl: '/partials/master/about',
				controller: 'MasterAboutCtrl'
			}).when('/master/blog/:title?', {
				templateUrl: '/partials/master/blog',
				controller: 'MasterBlogCtrl'
			}).when('/master/gallery/:category?', {
				templateUrl: '/partials/master/gallery',
				controller: 'MasterGalleryCtrl'
			}).when('/master/resume', {
				templateUrl: '/partials/master/resume',
				controller: 'MasterResumeCtrl'
			});

			// test routes
			$routeProvider.when('/tests/ui', {
				templateUrl: '/partials/tests/ui',
				controller: 'UICtrl'
			}).when('/tests/unit', {
				templateUrl: '/partials/tests/unit',
				controller: 'UnitCtrl'
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