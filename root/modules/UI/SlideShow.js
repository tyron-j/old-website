// SlideShow.js



(function () {

	Root.import(['Ajax', 'Task', 'UI/Behavior'],
		function (Ajax, Task, Behavior) {

			var SlideShow = Root.classify({

				extend: Behavior,

				initialize: function (node, options) {
					var that = this;

					this.getSlides(options.src).onSuccess(function (slides) { // to-do: configure options properly
						//
					});
				},

				methods: {

					getSlides: function (url) {
						var task = new Task();

						Ajax.get(url).onSuccess(function (res) { // to-do: add a fail condition
							var slides = res.match(/href\=\".+\"/g); // get the file names; to-do: make sure they're image files

							slides.shift(); // remove parent directory

							slides = slides.map(function (slide) {
								var div = document.createElement('div');

								div.style.backgroundImage = 'url(' + url + '/' + slide.replace(/^href\=/, '').replace(/\"/g, '') + ')';

								return div;
							});

							task.resolve(slides);
						});

						return task;
					}

				},

				statics: {
					//
				}

			});

			Root.export('UI/SlideShow', SlideShow);

		}
	);

})();