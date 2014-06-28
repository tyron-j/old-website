// sandbox.js



var pubRes;

enko.inject(['ajax'],
	function (ajax) {

		ajax.get('images').onSuccess(function (res) {
			pubRes = res;
		});

	}
);