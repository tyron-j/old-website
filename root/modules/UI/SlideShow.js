// SlideShow.js



(function () {

	Root.import(['Ajax', 'UI/Behavior'],
		function (Ajax, Behavior) {

			var SlideShow = Root.classify({

				extend: Behavior,

				initialize: function (node, options) {
					var that = this;

					this.getSlides(options.src).onSuccess(function () { // to-do: configure options properly
						//
					});
				},

				methods: {

					getSlides: function (url) {
						return Ajax.get(url).onSuccess(function (res) {
							var images = res.match(/href\=\".+\"/g);

							images.shift();

							images = images.map(function (image) {
								return image.replace(/^href\=/, '').replace(/\"/g, '');
							});

							// to-do: append slides
						});
					}

				},

				statics: {
					//
				}

			});

			Root.export('UI/SlideShow', SlideShow);

		}
	);

});