// login controller

define(function () {
	'use strict';

	return [
		'$cookies',
		'$scope',
		'$timeout',
		
		function ($cookies, $scope, $timeout) {
			var userName   = $cookies.get('userName');
			var userAnswer = $cookies.get('userAnswer');

			if (userName && userAnswer) {
				//
			} else {
				// asynchronous to show initial animation
				$timeout(function () {
					$scope.loginAgentShown = true;
				}, 1000);

				// login agent model
				var loginAgent = $scope.loginAgent = { // singleton; to-do: consider turning this into a global widget
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

					receiveAnswer: function (evt) {
						this.questionMode = false;
						this.text         = '';

						this.questionCallback(evt.target.value);
					},

					// textQueue must be array
					spewText: function (textQueue, callback) {
						var that = this;

						if (textQueue.length) {

							this.text = textQueue.shift();

							$timeout(function () {
								that.spewText(textQueue, callback);
							}, this.textDelay);
						} else {
							that.text = '';

							callback();
						}
					}
				};

				// login logic
				loginAgent.askQuestion("Who are you?", function (answer) {
					console.log(answer);

					loginAgent.spewText([
						"I don't think calling something commercial",
						"means that it needs to be publicly acceptable",
						"what's wrong with that?"
					], function () {
						//
					});
				});
			}
		}
	];
});