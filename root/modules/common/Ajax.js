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

				if (status === token || (token === 'whatever' && status !== 'pending')) { // needs testing
					callback(xhr.responseText);
				}
			});
		} else if (status === token || token === 'whatever') {
			callback(xhr.responseText);
		}
	}

	var Request = Root.classify({

		initialize: function (type, url, data, async) {
			var query = '',
				xhr = this.xhr = new XMLHttpRequest();

			if (async === undefined) {
				async = true;
			}

			xhr.open(type, url, async);
			xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

			if (data) {
				for (var key in data) {
					query += key + '=' + data[key] + '&';
				}

				query = query.replace(/\&$/, '');
			}

			xhr.send(query);
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

			onWhatever: function (callback) {
				handle(this.xhr, 'whatever', callback);
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