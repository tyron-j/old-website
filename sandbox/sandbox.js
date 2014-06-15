// sandbox.js



Root.import(['Ajax'],
	function (Ajax) {

		Ajax.get('images')
			.onSuccess(function (xhr) {
				console.log(xhr.responseText);
			});

	}
);