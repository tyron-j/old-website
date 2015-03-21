// configuration

require.config({
	baseUrl: '/js', // validate this later
	paths: {
		angular: '/js/lib/angular/angular.min',
		'angular-route': '/js/lib/angular/angular-route.min'
	},
	shim: {
		angular: {
			exports: 'angular'
		},
		'angular-route': {
			deps: ['angular']
		}
	}
});