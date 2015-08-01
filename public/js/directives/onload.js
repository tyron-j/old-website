// on load directive

define(function () {
	'use strict';

	return [
		'$parse',

		function ($parse) {
			return {
				restrict: 'A',
				link: function (scope, elem, attrs) {
					var handler = $parse(attrs.uiOnLoad);

					elem.on('load', function (evt) {
						scope.$apply(function () {
							handler(scope, {
								evt: evt
							});
						});
					});
				}
			};
		}
	];
});