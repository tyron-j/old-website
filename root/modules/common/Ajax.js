// Ajax.js



(function () {

	function getStatus (xhr) {
		if (xhr.readyState === 4) {
			if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
				return 'successful';
			} else {
				return 'unsuccessful';
			}
		} else {
			return 'pending';
		}
	}

	function handle (xhr, token, callback) { // needs testing
		var status = getStatus(xhr);

		if (status === 'pending') {
			xhr.addEventListener('readystatechange', function () {
				status = getStatus(xhr);

				if (status === token || (token === 'complete' && status !== 'pending')) { // needs testing
					callback(xhr);
				}
			});
		} else if (status === token || token === 'complete') {
			callback(xhr);
		}
	}

	var Request = Root.classify({

		initialize: function (type, url, data, async) {
			this.xhr = new XMLHttpRequest();

			this.xhr.open(type, url, async);
			this.xhr.send(data);
		},

		methods: {

			onSuccess: function (callback) {
				handle(this.xhr, 'successful', callback);
				return this;
			},

			onFail: function (callback) {
				handle(this.xhr, 'unsuccessful', callback);
				return this;
			},

			onComplete: function (callback) {
				handle(this.xhr, 'complete', callback);
				return this;
			}

		}

	});

	Root.export('Ajax', { // to-do: implement something similar to $.when
		get: function (url, data, async) {
			return new Request('GET', url, data, async);
		},
		post: function (url, data, async) {
			return new Request('POST', url, data, async);
		},
		put: function (url, data, async) {
			return new Request('PUT', url, data, async);
		}
	});

})();