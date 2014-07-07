// slideshow.js



enko.inject(['ajax', 'task', 'utils', 'ui/dom', 'ui/widget', 'ui/widgets/floater'],
	function (ajax, Task, utils, dom, Widget, Floater) {
		'use strict';

		var SlideShow = enko.classify({

			extend: Widget,

			initialize: function (node, options) {
				Widget.call(this, node, options);

				var that = this;

				// styles
				node.style.marginLeft = -node.offsetWidth / 2;
				node.style.marginTop = -node.offsetHeight / 2;

				this.dimensions = {
					width: node.offsetWidth,
					height: node.offsetHeight
				};

				this.getSlides(options.src).onSuccess(function (slides) { // to-do: change this src business
					that.appendSlides(slides);
				});

				this.createButtons(options.buttonOptions);
			},

			methods: {

				createButtons: function (buttonOptions) {
					var buttons = dom.create('div'),
						leftButton,
						rightButton,
						leftArrow,
						rightArrow,
						that;

					// buttons
					leftButton = buttons.appendChild(dom.create('div'));
					rightButton = buttons.appendChild(dom.create('div'));
					leftButton.classList.add('LeftButton');
					rightButton.classList.add('RightButton');

					// arrows
					leftArrow = leftButton.appendChild(dom.create('div'));
					rightArrow = rightButton.appendChild(dom.create('div'));
					leftArrow.classList.add('ArrowIcon');
					rightArrow.classList.add('ArrowIcon');

					this.node.appendChild(buttons);

					buttons = new Floater(buttons, buttonOptions);

					buttons.stylize({
						marginLeft: -buttons.node.offsetWidth / 2, // to-do: implement Widget.prototype.width?
						marginBottom: -buttons.node.offsetHeight
					});

					// event handlers
					this.handle('mouseover', function (evt) {
						evt.stopPropagation(); // to-do: see if this is necessary
						buttons.trigger('mouseover');
					});

					this.handle('mouseout', function (evt) {
						evt.stopPropagation();
						buttons.trigger('mouseout');
					});
				},

				getSlides: function (url) {
					var task = new Task(),
						that = this;

					ajax.get(url).onSuccess(function (res) { // to-do: add a fail condition
						var slides = res.match(/href\=\".+\"/g), // get the file names
							ext; // pointer

						slides = slides.map(function (slide) {
							return slide.replace(/^href\=/, '').replace(/\"/g, ''); // trim
						}).filter(function (slide) {
							ext = slide.split('.');
							ext = ext[ext.length - 1]; // get extension

							return utils.contains(SlideShow.imgTypes, ext); // make sure the file is an image
						}).map(function (slide) {
							var div = dom.create('div');
							
							div.style.backgroundImage = 'url(' + url + '/' + slide + ')';

							utils.merge([div.style, that.dimensions]);
							div.classList.add('Slide'); // make sure default theme is being used

							return div;
						});

						task.resolve(slides);
					});

					return task;
				},

				appendSlides: function (slides) { // overwrite this method for different slide show types
					var container = this.node.appendChild(dom.create('div'));

					utils.merge([container.style, {
						position: 'relative', // for transitions
						width: this.dimensions.width * slides.length
					}]);

					slides.forEach(function (slide) {
						container.appendChild(slide);
					});
				},

				transition: function () { // update container.style.left and container.style.right
					//
				}

			},

			statics: {
				imgTypes: ['bmp', 'jpg', 'png'],
				options: {
					class: 'SlideShow',
					style: { // to-do: set defaults through less?
						width: 1000,
						height: 625
					},
					buttonOptions: {
						class: 'Buttons',
						style: {
							width: 150,
							height: 50
						}
					}
				}
			}

		});

		enko.define('ui/widgets/slideshow', SlideShow);

	}
);