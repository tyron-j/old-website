// special controller

define([
	'models/user'
], function (userModel) {
	'use strict';

	return [
		'$cookies',
		'$http',
		'$location',
		'$scope',

		'modalDialogSvc',
		
		function ($cookies, $http, $location, $scope, modalDialogSvc) {
			var modalDialog = modalDialogSvc.model;
			var userName    = userModel.name || $cookies.get('userName');
			var userAnswer  = userModel.answer || $cookies.get('userAnswer');

			$scope.openLetter = function () {
				// do nothing
			};

			if (userName && userAnswer) {
				modalDialog.open({
					title: 'Confirmation',
					content: "These are my honest and heartfelt confessions to you. Preferably, you should read them after my death. Proceed anyway?",
					buttons: [{
						title: 'Yes',
						onClick: function () {
							modalDialog.content = "You're a bad, bad person.";
							modalDialog.choice  = 'singular';
							modalDialog.buttons = [{
								title: "I know.",
								onClick: function () {
									modalDialog.close();

									$http.get('/api/special?name=' + userName + '&answer=' + userAnswer).then(function (res) {
										$scope.specialLetter = res.data; // implicit property
									}, function (res) { // failure
										// to-do: handle error gracefully
										$location.path('home');
									});
								}
							}];
						}
					}, {
						title: 'No',
						onClick: function () {
							modalDialog.close();
							$location.path('home');
						}
					}]
				});

				$scope.openLetter = function () {
					$scope.letterOpened = true; // implicit property; to-do: mark all implicit properties
				};
			} else {
				modalDialog.open({
					title: 'Unauthorized',
					content: "There's nothing for you here. Perhaps try logging in again?",
					buttons: [{
						title: 'OK',
						onClick: function () {
							modalDialog.close();
							$location.path('home');
						}
					}]
				});
			}
		}
	];
});