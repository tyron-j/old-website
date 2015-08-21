// on enter directive

define(function () {
	'use strict';

	return [
		'$parse',

		function ($parse) {
			return {
				restrict: 'A',
				link: function ($scope, elem, attrs) {
					var handler = $parse(attrs.uiOnEnter);

					elem.on('keydown keypress', function (evt) {
						if (evt.which === 13) {
							$scope.$apply(function () {
								handler($scope, {
									evt: evt
								});
							});
						}
					});
				}
			};
		}
	];
});