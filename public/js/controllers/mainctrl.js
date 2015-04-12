// main controller

define(function () {
	'use strict';

	return [
		'$http',
		'$scope',
		
		function ($http, $scope) {
			// "global" object that can be manipulated by any controller
			$scope.sideBar = {
				inUse: false
			};
		}
	];
});