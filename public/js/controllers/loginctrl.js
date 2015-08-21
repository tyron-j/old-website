// login controller

define(function () {
	'use strict';

	return [
		'$cookies',
		'$http',
		'$scope',
		'$timeout',
		
		function ($cookies, $http, $scope, $timeout) {
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
							"Prove that you are " + res.data.firstName + "."
						], function () {
							loginAgent.askQuestion(res.data.question, function (answer) {
								$http.get('/api/user?name=' + name + '&answer=' + answer).then(function (res) {
									//
								}, function (res) { // fail condition
									console.error(res.data.msg); // to-do: handle error properly
								});
							});
						});
					}, function (res) { // fail condition
						console.error(res.data.msg); // to-do: handle error properly
					});
				});
			}
		}
	];
});