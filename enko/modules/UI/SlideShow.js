// SlideShow.js



enko.inject(['Ajax', 'Task', 'Utils', 'UI/Behavior'],
	function (Ajax, Task, Utils, Behavior) {

		var SlideShow = enko.classify({

			extend: Behavior,

			initialize: function (node, options) {
				var that = this;

				Behavior.call(this, node);

				this.dimensions = {
					width: node.offsetWidth,
					height: node.offsetHeight
				};

				this.getSlides(options.src).onSuccess(function (slides) { // to-do: configure options properly
					that.appendSlides(slides);
				});
			},

			methods: {

				getSlides: function (url) {
					var task = new Task(),
						that = this;

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

							Utils.consolidate([div.style, that.dimensions], true);
							div.classList.add('Slide'); // make sure default theme is being used

							return div;
						});

						task.resolve(slides);
					});

					return task;
				},

				appendSlides: function (slides) { // overwrite this method for different slide show types
					var container = this.node.appendChild(document.createElement('div'));

					Utils.consolidate([container.style, {
						position: 'relative', // for transitions
						width: this.dimensions.width * slides.length
					}], true);

					slides.forEach(function (slide) {
						container.appendChild(slide);
					});
				},

				transition: function () { // update container.style.left and container.style.right
					//
				}

			},

			statics: {

				imgTypes: ['bmp', 'jpg', 'png']

			}

		});

		enko.define('UI/SlideShow', SlideShow);

	}
);