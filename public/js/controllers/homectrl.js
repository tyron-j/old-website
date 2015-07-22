// home controller

define(function () {
	'use strict';

	return [
		'$scope',
		'$timeout',
		
		function ($scope, $timeout) {
			$scope.homeLinks = [{
				title: 'About',
				href: '/about'
			}, {
				title: 'Blog',
				href: '/blog'
			}, {
				title: 'Gallery',
				href: '/gallery'
			}, {
				title: 'Novel',
				href: '/novel'
			}, {
				title: 'Resume',
				href: '/resume'
			}, {
				title: 'Special',
				href: '/special'
			}];

			$scope.homeNews = [{ // to-do: fetch these from db via http
				shown: true,
				src: 'http://i.imgur.com/jwD87Hu.jpg'
			}, {
				shown: false,
				src: 'https://data.archive.moe/board/a/image/1418/58/1418586274250.jpg'
			}];

			var timeoutPromise;

			var switchImage = function () {
				$scope.homeNews[0].shown = !$scope.homeNews[0].shown;
				$scope.homeNews[1].shown = !$scope.homeNews[1].shown;

				timeoutPromise = $timeout(switchImage, 5000);
			};

			var ignoreLocationChangeStart = $scope.$on('$locationChangeStart', function (evt, next, current) {
				$timeout.cancel(timeoutPromise);
				ignoreLocationChangeStart();
			});

			timeoutPromise = $timeout(switchImage, 5000);
		}
	];
});