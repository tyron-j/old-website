// home controller

define(function () {
	'use strict';

	return [
		'$scope',
		'$interval',
		'$timeout',
		
		function ($scope, $interval, $timeout) {
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
				inFront: false, // needed for CSS shortcomings
				src: 'http://i.imgur.com/jwD87Hu.jpg'
			}, {
				shown: false,
				src: 'https://data.archive.moe/board/a/image/1418/58/1418586274250.jpg'
			}];

			var intervalPromise;
			var timeoutPromise;

			var switchPos = function () {
				$scope.homeNews[0].inFront = !$scope.homeNews[0].inFront;
			};

			var switchImg = function () {
				$scope.homeNews[0].shown = !$scope.homeNews[0].shown;
				$scope.homeNews[1].shown = !$scope.homeNews[1].shown;
				timeoutPromise           = $timeout(switchPos, 2500);
			};

			var ignoreLocationChangeStart = $scope.$on('$locationChangeStart', function (evt, next, current) {
				$interval.cancel(intervalPromise);
				$timeout.cancel(timeoutPromise);
				ignoreLocationChangeStart();
			});

			intervalPromise = $interval(switchImg, 5000);
		}
	];
});