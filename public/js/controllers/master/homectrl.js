// master home controller

define(function () {
	'use strict';

	return [
		'$http',
		'$scope',

		'buttonBarSvc',
		
		function ($http, $scope, buttonBarSvc) {
			var ContentButtonBar = buttonBarSvc.HomeNewsListContentEditor;

			$scope.homeNewsListHeader = 'Home News List';
			$scope.headerButtonBar    = buttonBarSvc.getHomeNewsListItemAdder($scope);

			$scope.homeNewsListItems = [{
				buttonBar: new ContentButtonBar()
			}, {
				buttonBar: new ContentButtonBar()
			}, {
				buttonBar: new ContentButtonBar()
			}, {
				buttonBar: new ContentButtonBar()
			}, {
				buttonBar: new ContentButtonBar()
			}]
		}
	];
});