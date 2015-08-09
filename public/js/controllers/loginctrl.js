// login controller

define(function () {
	'use strict';

	return [
		'$cookies',
		'$scope',
		'$timeout',
		
		function ($cookies, $scope, $timeout) {
			$timeout(function () {
				$scope.loginAgentShown = true;
			}, 1000);
		}
	];
});