// resume controller

define(function () {
	'use strict';

	return [
		'$scope',

		'buttonBarSvc',
		
		function ($scope, buttonBarSvc) {
			$scope.resumeHeader = 'Tyron Jung';
			$scope.resumeContentHeaders = [{
					icon: 'bar-chart',
					title: 'Employment History'
				}, {
					icon: 'lightbulb-o',
					title: 'Work Outside of Work'
				}, {
					icon: 'sitemap',
					title: 'Skills'
				}
			];

			$scope.buttonBar = buttonBarSvc.resumeMenu;
		}
	];
});