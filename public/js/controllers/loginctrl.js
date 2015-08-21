// login controller

define(function () {
	'use strict';

	return [
		'$cookies',
		'$http',
		'$location',
		'$scope',
		'$timeout',
		
		function ($cookies, $http, $location, $scope, $timeout) {
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

						$timeout(function () { // asynchronous auto focus
							var input = document.getElementsByClassName('login-agent-text-bubble-input')[0];

							input && input.focus();
						});
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
				loginAgent.askQuestion("Who are you?", function (name) {
					$http.get('/api/user?name=' + name).then(function (res) {
						loginAgent.spewText([
							"Prove that you are " + res.data.firstName + " by answering the following question."
						], function () {
							loginAgent.askQuestion(res.data.question, function (answer) {
								$http.get('/api/user?name=' + name + '&answer=' + answer).then(function (res) {
									loginAgent.spewText([
										"Welcome, " + res.data.firstName + ".",
										"I have some homemade cookies that expire automatically.",
										"I highly recommend that you try them out."
									], function () {
										loginAgent.askQuestion("Would you like some?", function (answer) { // to-do: make this binary
											//
										});
									});
								}, function (res) { // fail condition
									loginAgent.spewText([
										"Beep - wrong answer.",
										"You can still proceed to my website though.",
										"Even if you're an impersonating scum."
									], function () {
										$location.path('home');
									});
								});
							});
						});
					}, function (res) { // fail condition
						loginAgent.spewText([
							"It appears we haven't met.",
							"You can still proceed to my website though."
						], function () {
							$location.path('home');
						});
					});
				});
			}
		}
	];
});