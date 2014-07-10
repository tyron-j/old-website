// ajax.js

// to-do: implement ajax.delete

(function () {

	function getStatus(xhr) {
		if (xhr.readyState === 4) {
			if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
				return 'successful'; // consider changing these tokens to numbers
			} else {
				return 'unsuccessful';
			}
		} else {
			return 'pending';
		}
	}

	function handle(xhr, token, callback) { // needs testing
		var status = getStatus(xhr);

		if (status === 'pending') {
			xhr.addEventListener('readystatechange', function () {
				status = getStatus(xhr);

				if (status === token || (token === 'whatever' && status !== 'pending')) { // needs testing
					callback(xhr.responseText); // to-do: consider passing in the xhr object instead
				}
			});
		} else if (status === token || token === 'whatever') {
			callback(xhr.responseText);
		}
	}

	var Request = enko.classify({

		initialize: function (type, url, data, async) {
			var query = '',
				xhr = this.xhr = new XMLHttpRequest();

			if (async === undefined) {
				async = true;
			}

			xhr.open(type, url, async);
			xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded'); // to-do: make this configurable

			if (data) { // to-do: change how this is done
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

	enko.define('ajax', {
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