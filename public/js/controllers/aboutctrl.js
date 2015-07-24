// about controller

define(function () {
	'use strict';

	return [
		'$scope',
		
		function ($scope) {
			$scope.aboutPicture = {
				src: 'https://38.media.tumblr.com/11120cce3ebd398acc5919b766b88340/tumblr_nkf2g1NHzx1timq39o1_500.gif'
			};

			$scope.aboutText = 'Ka ka ka ka ka ka ka ka ka ka ka ka ka ka ka ka ka ka ka ka ka ka ka ka ka ka ka ka.';

			$scope.aboutExternalLinks = [{
				src: 'https://github.com/tyron-j',
				icon: 'github',
				title: 'GitHub'
			}, {
				src: 'https://ca.linkedin.com/pub/tyron-jung/58/a57/246',
				icon: 'linkedin',
				title: 'LinkedIn'
			}, {
				src: 'facebook',
				icon: 'facebook',
				title: 'Facebook'
			}, {
				src: 'mailto:tyronjung@hotmail.com',
				icon: 'paper-plane',
				title: 'Email'
			}]
		}
	];
});