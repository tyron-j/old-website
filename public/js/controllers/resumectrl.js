// resume controller

define(function () {
	'use strict';

	return [
		'$http',
		'$scope',

		'buttonBarSvc',
		
		function ($http, $scope, buttonBarSvc) {
			$scope.resumeHeader = 'Tyron Jung';
			$scope.resumeContent = [{
				header: {
					title: 'Employment History',
					icon: 'bar-chart'
				},
				items: []
			}, {
				header: {
					title: 'Work Outside of Work',
					icon: 'lightbulb-o'
				},
				items: []
			}, {
				header: {
					title: 'Skills',
					icon: 'sitemap'
				},
				items: []
			}];

			$http.get('/api/experience').success(function (res) {
				res.forEach(function (exp) {
					switch (exp.category) {
						case 'employment':
							$scope.resumeContent[0].items.push(exp);
							break;
						case 'recreation':
							$scope.resumeContent[1].items.push(exp);
							break;
					}
				});
			});

			$http.get('/api/skill').success(function (res) {
				$scope.resumeContent[2].items = res;
			});

			$scope.buttonBar = buttonBarSvc.resumeMenu;
		}
	];
});