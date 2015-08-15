// login controller

define(function () {
	'use strict';

	return [
		'$cookies',
		'$scope',
		'$timeout',
		
		function ($cookies, $scope, $timeout) {
			$timeout(function () {
				$scope.loginAgentShown = true;
			}, 1000);

			var loginAgent = { // singleton; to-do: consider turning this into a global widget
				questionMode: false,
				questionCallback: function () {
					console.error("No question was passed into the login agent"); // default logic
				},
				textDelay: 3000, // constant for how long each text is displayed
				text: '',

				askQuestion: function (question, callback) {
					this.questionMode     = true;
					this.questionCallback = callback || this.questionCallback;
					this.text             = question || '';
				},

				receiveAnswer: function (answer) {
					this.questionMode = false;

					this.questionCallback(answer);
				},

				// textQueue must be array
				spewText: function (textQueue, callback) {
					if (textQueue.length) {
						var that = this;

						this.text = textQueue.shift();

						$timeout(function () {
							that.spewText(textQueue, callback);
						}, this.textDelay);
					} else {
						callback();
					}
				}
			};
		}
	];
});