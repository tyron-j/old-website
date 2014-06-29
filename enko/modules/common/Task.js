// task.js



enko.inject(['utils'],
	function (utils) {

		function execute(handlers, result) {
			handlers.forEach(function (handler) {
				handler(result);
			});
		}

		var Task = enko.classify({

			initialize: function () {
				this.successHandlers = [];
				this.failHandlers = [];
			},

			methods: {

				onSuccess: function (callback) {
					if (this.successful === true) {
						callback(this.result);
					} else {
						this.successHandlers.push(callback);
					}

					return this;
				},

				onFail: function (callback) {
					if (this.successful === false) {
						callback(this.result);
					} else {
						this.failHandlers.push(callback);
					}

					return this;
				},

				onWhatever: function (callback) {
					if (utils.isBoolean(this.successful)) {
						callback(this.result);
					} else {
						this.successHandlers.push(callback);
						this.failHandlers.push(callback);
					}

					return this;
				},

				resolve: function (result) {
					this.successful = true;
					this.result = result;

					execute(this.successHandlers, result);

					return this;
				},

				cancel: function (result) {
					this.successful = false;
					this.result = result;

					execute(this.failHandlers, result);

					return this;
				}

			}

		});

		Task.Pile = enko.classify({ // needs testing

			extend: Task,

			initialize: function (tasks) { // tasks passed in as array; to-do: consider using [].slice.call(arguments) if only objects of the same type is expected
				var that = this;

				Task.call(this);

				this.completed = 0;
				this.total = tasks.length;

				tasks.forEach(function (task) {
					task.onSuccess(function () {
						that.progress();
					}).onFail(function () {
						that.cancel();
					});
				});
			},

			methods: {

				progress: function () {
					this.completed++;

					if (this.completed === this.total) {
						this.resolve();
					}
				}

			}

		});

		enko.define('task', Task);

	}
);