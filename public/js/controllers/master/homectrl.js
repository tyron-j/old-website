// master home controller

define(function () {
	'use strict';

	return [
		'$http',
		'$scope',

		'buttonBarSvc',
		
		function ($http, $scope, buttonBarSvc) {
			var ContentButtonBar = buttonBarSvc.NewsListContentEditor;

			$scope.newsListHeader  = 'News List';
			$scope.headerButtonBar = buttonBarSvc.getNewsListItemAdder($scope);

			$scope.newsListItems = [{
				//
			}, {
				//
			}, {
				//
			}, {
				//
			}, {
				//
			}]

			$scope.newsListItems.forEach(function (item) {
				item.buttonBar = new ContentButtonBar(item);
			});
		}
	];
});