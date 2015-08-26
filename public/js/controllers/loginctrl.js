// login controller

define([
	'models/user'
], function (userModel) {
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
				// update local model
				userModel.name   = userName;
				userModel.answer = userAnswer;
				
				$location.path('home');
			} else {
				// asynchronous to show initial animation
				$timeout(function () {
					$scope.loginAgentShown = true;
				}, 1000);

				// login agent model
				var loginAgent = $scope.loginAgent = { // singleton; to-do: consider turning this into a global widget
					binaryMode: false, // binary question
					questionMode: false,

					questionCallback: function () {
						console.error("No question was passed into the login agent"); // default logic
					},

					textDelay: 3000, // constant for how long each text is displayed
					text: '',

					askQuestion: function (question, callback, binaryMode) {
						this.binaryMode       = !!binaryMode;
						this.questionMode     = true;
						this.questionCallback = callback || this.questionCallback;
						this.text             = question || '';

						$timeout(function () { // asynchronous auto focus
							var input = document.getElementsByClassName('login-agent-text-bubble-input')[0];

							input && input.focus();
						});
					},

					receiveAnswer: function (evt) {
						// these have to be called before questionCallback
						this.questionMode = false;
						this.text         = '';

						if (this.binaryMode) {
							this.questionCallback(evt); // evt parameter is binary
						} else {
							this.questionCallback(evt.target.value);
						}

						this.binaryMode = false;
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
					if (/^tyron(?=.*jung$)/i.test(name)) {
						loginAgent.spewText([
							"Nice try.",
							"You can still proceed to my website though.",
							"Even if you're an impersonating scum."
						], function () {
							$location.path('home');
						});
					} else {
						$http.get('/api/user?name=' + name).then(function (res) {
							loginAgent.spewText([
								"Prove that you are " + res.data.firstName + " by answering the following question."
							], function () {
								loginAgent.askQuestion(res.data.question, function (answer) {
									$http.get('/api/user?name=' + name + '&answer=' + answer).then(function (res) {
										// update local model
										userModel.name   = name;
										userModel.answer = answer;

										loginAgent.spewText([
											"Welcome, " + res.data.firstName + ".",
											"I have some homemade cookies that expire automatically.",
											"I highly recommend that you try them out."
										], function () {
											loginAgent.askQuestion("Would you like some?", function (wantsCookie) { // to-do: make this binary
												if (wantsCookie === true) {
													$cookies.put('userName', name, {
														expires: new Date(Date.now() + 30 * 1000) // to-do: it currently lasts only 30s
													});

													$cookies.put('userAnswer', answer, {
														expires: new Date(Date.now() + 30 * 1000) // to-do: it currently lasts only 30s
													});

													loginAgent.spewText([
														"There you go, cookies.",
														"You can go to the website now. :)"
													], function () {
														$location.path('home');
													});
												} else {
													loginAgent.spewText([
														"Shame, they're really good.",
														"In any case, please proceed to my website."
													], function () {
														$location.path('home');
													});
												}
											}, true);
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
					}
				});
			}
		}
	];
});