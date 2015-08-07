// about controller

define(function () {
	'use strict';

	return [
		'$http',
		'$scope',
		
		function ($http, $scope) {
			$scope.imageLoaded = false;

			$scope.handleImageLoad = function (evt) {
				$scope.imageLoaded = true;
			};

			$http.get('/api/image/about').success(function (res) {
				$scope.aboutPicture = {
					src: '/api/image/about/' + res[0].title
				};
			});

			$http.get('/api/intro').success(function (res) {
				$scope.aboutText = res.content;
			});
			
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