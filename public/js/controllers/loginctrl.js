// login controller

define(function () {
	'use strict';

	return [
		'$cookies',
		'$scope',
		'$timeout',
		
		function ($cookies, $scope, $timeout) {
			// to-do: make login agent a widget
			$timeout(function () {
				$scope.loginAgentShown = true;
			}, 1000);
		}
	];
});