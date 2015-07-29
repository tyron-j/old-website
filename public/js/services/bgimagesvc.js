// background image service

define(function () {
	'use strict';

	return [
		function () { // use as factory
			return {
				model: {
					inUse: false,
					url: '',

					open: function (url) {
						this.inUse = true;
						this.url   = url;
					},

					close: function () {
						this.inUse = false;
						this.url   = '';
					}
				},

				blogMode: function ($scope) {
					var bgImage = this.model;
					var ignoreLocationChangeStart;

					bgImage.open('http://abload.de/img/000132ynkst.png');
					
					ignoreLocationChangeStart = $scope.$on('$locationChangeStart', function (evt, next, current) {
						bgImage.close();
						ignoreLocationChangeStart();
					});
				}
			};
		}
	];
});