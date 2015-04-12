// configuration

require.config({
	baseUrl: '/js', // validate this later
	paths: {
		angular: '/js/lib/angular/angular.min',
		'angular-animate': '/js/lib/angular/angular-animate.min',
		'angular-route': '/js/lib/angular/angular-route.min'
	},
	shim: {
		angular: {
			exports: 'angular'
		},
		'angular-animate': {
			deps: ['angular']
		},
		'angular-route': {
			deps: ['angular']
		}
	}
});