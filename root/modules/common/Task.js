// Task.js



Root.import(['Utils'],
	function (Utils) {

		function execute (handlers, result) {
			handlers.forEach(function (handler) {
				handler(result);
			});
		}

		var Task = Root.classify({

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
					if (Utils.isBoolean(this.successful)) {
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
				},

				cancel: function (result) {
					this.successful = false;
					this.result = result;

					execute(this.failHandlers, result);
				}

			}

		});

		Task.Pile = Root.classify({ // needs testing

			extend: Task,

			initialize: function (tasks) { // tasks passed in as array
				var that = this;

				Task.call(this);

				this.completed = 0;
				this.total = tasks.length;

				tasks.forEach(function (task) {
					task.onSuccess(function () {
						that.progress(true);
					}).onFail(function () {
						that.progress(false);
					});
				});
			},

			methods: {

				progress: function (successful) {
					if (successful) {
						this.completed++;

						if (this.completed === this.total) {
							this.resolve();
						}
					} else {
						this.cancel();
					}
				}

			}

		});

		Root.export('Task', Task);

	}
);