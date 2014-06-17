// SlideShow.js

// to-do: consider setting certain styles with CSS

Root.import(['Ajax', 'Task', 'Utils', 'UI/Behavior'],
	function (Ajax, Task, Utils, Behavior) {

		var SlideShow = Root.classify({

			extend: Behavior,

			initialize: function (node, options) {
				var that = this;

				Behavior.call(this, node);
				node.classList.add('SlideShow');

				node.style.overflow = 'hidden';

				this.dimensions = {
					width: node.offsetWidth || SlideShow.width,
					height: node.offsetHeight || SlideShow.height
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

							return div;
						});

						task.resolve(slides);
					});

					return task;
				},

				appendSlides: function (slides) { // overwrite this method for different slide show types
					var slideShow = this.node,
						container = slideShow.appendChild(document.createElement('div')),
						slideStyle = {
							backgroundPosition: 'center',
							backgroundRepeat: 'no-repeat',
							backgroundSize: 'contain',
							display: 'inline-block',
							position: 'relative'
						};

					Utils.consolidate([container.style, {
						fontSize: 0, // remove space between 
						position: 'relative', // for transitions
						width: this.dimensions.width * slides.length
					}], true);

					slides.forEach(function (slide) {
						Utils.consolidate([slide.style, slideStyle], true);
						container.appendChild(slide);
					});
				},

				transition: function () {
					// update container.style.left and container.style.right
				}

			},

			statics: {

				imgTypes: ['bmp', 'jpg', 'png'],
				width: 1000,
				height: 625

			}

		});

		Root.export('UI/SlideShow', SlideShow);

	}
);