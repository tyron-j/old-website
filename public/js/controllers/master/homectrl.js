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

			$http.get('/api/news').then(function (res) {
				$scope.newsListItems = res.data;

				$scope.newsListItems.forEach(function (item) {
					item.buttonBar = new ContentButtonBar($scope, item);
				});
			});

			$scope.handleImageLoad = function (evt, item) {
				var elem = evt.target;

				item.imageLoaded     = true;
				item.imageHorizontal = elem.naturalWidth >= elem.naturalHeight;
			}
		}
	];
});