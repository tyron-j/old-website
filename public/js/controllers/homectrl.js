// home controller

define(function () {
	'use strict';

	return [
		'$http',
		'$scope',
		'$interval',
		'$timeout',
		
		function ($http, $scope, $interval, $timeout) {
			$scope.homeLinks = [{
				title: 'About',
				href: '/about',
				icon: 'at'
			}, {
				title: 'Blog',
				href: '/blog',
				icon: 'bold'
			}, {
				title: 'Gallery',
				href: '/gallery',
				icon: 'eye'
			}, {
				title: 'Novel',
				href: '/novel',
				icon: 'bookmark-o'
			}, {
				title: 'Resume',
				href: '/resume',
				icon: 'code'
			}, {
				title: 'Special',
				href: '/special',
				icon: 'envelope-o'
			}];

			$http.get('/api/news').success(function (res) {
				$scope.homeNews = [{ // to-do: fetch these from db via http
					shown: true,
					inFront: false, // needed for CSS shortcomings
					href: res[0].href,
					imageTitle: res[0].imageTitle
				}, {
					shown: false,
					href: res[1].href,
					imageTitle: res[1].imageTitle
				}];

				var homeNewsIdx = 1; // initial values
				var resIdx      = 1; // initial values
				var resLen      = res.length;

				var intervalPromise;
				var timeoutPromise;

				var switchPos = function () { // assumes that there are at least 2 news items
					homeNewsIdx ^= 1;
					resIdx++;

					if (resIdx >= resLen) {
						resIdx = 0;
					}
					
					$scope.homeNews[0].inFront              = !$scope.homeNews[0].inFront;
					$scope.homeNews[homeNewsIdx].href       = res[resIdx].href;
					$scope.homeNews[homeNewsIdx].imageTitle = res[resIdx].imageTitle;
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
			});
		}
	];
});