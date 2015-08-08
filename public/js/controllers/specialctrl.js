// special controller

define(function () {
	'use strict';

	return [
		'$scope',
		
		function ($scope) {
			$scope.openLetter = function () {
				$scope.letterOpened = !$scope.letterOpened; // implicit property; to-do: mark all implicit properties
			};
		}
	];
});