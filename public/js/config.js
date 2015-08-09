// configuration

require.config({
	baseUrl: '/js',
	paths: {
		angular: '/js/lib/angular/angular.min',
		'angular-animate': '/js/lib/angular/angular-animate.min',
		'angular-cookies': '/js/lib/angular/angular-cookies.min',
		'angular-route': '/js/lib/angular/angular-route.min'
	},
	shim: {
		angular: {
			exports: 'angular'
		},
		'angular-animate': {
			deps: ['angular']
		},
		'angular-cookies': {
			deps: ['angular']
		},
		'angular-route': {
			deps: ['angular']
		}
	}
});