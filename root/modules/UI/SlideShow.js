// SlideShow.js



Root.import(['Ajax', 'Task', 'Utils', 'UI/Behavior'],
	function (Ajax, Task, Utils, Behavior) {

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
						var slides = res.match(/href\=\".+\"/g), // get the file names
							ext; // pointer

						slides = slides.map(function (slide) {
							return slide.replace(/^href\=/, '').replace(/\"/g, ''); // trim
						}).filter(function (slide) {
							ext = slide.split('.');
							ext = ext[ext.length - 1]; // get extension

							return Utils.contains(SlideShow.imgTypes, ext); // make sure the file is an image
						}).map(function (slide) {
							var div = document.createElement('div');

							div.style.backgroundImage = 'url(' + url + '/' + slide + ')';

							return div;
						});

						task.resolve(slides);
					});

					return task;
				},

				transition: function () {
					//
				}

			},

			statics: {

				imgTypes: ['bmp', 'jpg', 'png']
				
			}

		});

		Root.export('UI/SlideShow', SlideShow);

	}
);