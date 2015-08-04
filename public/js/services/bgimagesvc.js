// background image service

define(function () {
	'use strict';

	return [
		function () { // use as factory
			return {
				model: {
					inUse: false,
					imageCategory: '',
					imageTitle: '',

					open: function (imageCategory, imageTitle) {
						this.inUse         = true;
						this.imageCategory = imageCategory;
						this.imageTitle    = imageTitle;
					},

					close: function () {
						this.inUse         = false;
						this.imageCategory = '';
						this.imageTitle    = '';
					}
				}/*,

				blogMode: function ($scope) {
					var bgImage = this.model;
					var ignoreLocationChangeStart;

					bgImage.open('http://abload.de/img/000132ynkst.png');
					
					ignoreLocationChangeStart = $scope.$on('$locationChangeStart', function (evt, next, current) {
						bgImage.close();
						ignoreLocationChangeStart();
					});
				}*/
			};
		}
	];
});