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
				loaded: false,
				items: []
			}, {
				header: {
					title: 'Work Outside of Work',
					icon: 'lightbulb-o'
				},
				loaded: false,
				items: []
			}, {
				header: {
					title: 'Skills',
					icon: 'sitemap'
				},
				loaded: false,
				items: []
			}];

			$http.get('/api/experience').then(function (res) {
				$scope.resumeContent[0].loaded = true;
				$scope.resumeContent[1].loaded = true;

				res.data.forEach(function (exp) {
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

			$http.get('/api/skill').then(function (res) {
				$scope.resumeContent[2].loaded = true;
				$scope.resumeContent[2].items  = res.data;
			});

			$scope.buttonBar = buttonBarSvc.resumeMenu;
		}
	];
});