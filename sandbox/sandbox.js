// sandbox.js



var pubRes;

Root.import(['Ajax'],
	function (Ajax) {

		Ajax.get('images').onSuccess(function (res) {
			pubRes = res;
		});

	}
);