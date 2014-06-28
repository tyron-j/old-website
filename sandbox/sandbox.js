// sandbox.js



var pubRes;

enko.inject(['Ajax'],
	function (Ajax) {

		Ajax.get('images').onSuccess(function (res) {
			pubRes = res;
		});

	}
);