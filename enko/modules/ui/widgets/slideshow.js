// slideshow.js



enko.inject(['ajax', 'task', 'utils', 'ui/animation', 'ui/dom', 'ui/widget', 'ui/widgets/floater'],
	function (ajax, Task, utils, animation, dom, Widget, Floater) {
		'use strict';

		var SlideShow = enko.classify({

			extend: Widget,

			initialize: function (node, options) {
				Widget.call(this, node, options);

				var that = this;

				// styles
				node.style.marginLeft = -node.offsetWidth / 2;
				node.style.marginTop = -node.offsetHeight / 2;

				this.currentSlide = 1;
				this.lastSlide = 1; // change this after getting the slides
				this.transitioning = false;

				// dimensions
				this.width = node.offsetWidth;
				this.height = node.offsetHeight;

				this.getSlides(options.src).onSuccess(function (slides) { // to-do: change this src business
					that.lastSlide = slides.length;

					that.appendSlides(slides);
				});

				this.createButtons(options.buttonOptions);
			},

			methods: {

				createButtons: function (buttonOptions) {
					var buttons = this.node.appendChild(dom.create('div')),
						leftButton,
						rightButton,
						leftArrow,
						rightArrow,

						that = this;

					// buttons
					leftButton = buttons.appendChild(dom.create('div', {
						class: 'LeftButton'
					}));
					rightButton = buttons.appendChild(dom.create('div', {
						class: 'RightButton'
					}));

					// arrows
					leftArrow = leftButton.appendChild(dom.create('div', {
						class: 'ArrowIcon'
					}));
					rightArrow = rightButton.appendChild(dom.create('div', {
						class: 'ArrowIcon'
					}));

					buttons = new Floater(buttons, buttonOptions);

					buttons.stylize({
						marginLeft: -buttons.node.offsetWidth / 2, // to-do: implement Widget.prototype.width?
						marginBottom: -buttons.node.offsetHeight
					});

					// event handlers
					this.handle({
						mouseover: function (evt) {
							evt.stopPropagation(); // to-do: see if this is necessary
							buttons.trigger('mouseover');
						},
						mouseout: function (evt) {
							evt.stopPropagation();
							buttons.trigger('mouseout');
						}
					});

					leftButton.addEventListener('click', function () {
						that.transition(-1);
					});

					rightButton.addEventListener('click', function () {
						that.transition(1);
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
							var div = dom.create('div', {
								class: 'Slide',
								style: {
									backgroundImage: 'url(' + url + '/' + slide + ')',
									width: that.width,
									height: that.height
								}
							});

							return div;
						});

						task.resolve(slides);
					});

					return task;
				},

				appendSlides: function (slides) { // overwrite this method for different slide show types
					var container = this.container = this.node.appendChild(dom.create('div', {
						style: {
							position: 'relative',
							width: this.width * slides.length
						}
					}));

					slides.forEach(function (slide) {
						container.appendChild(slide);
					});
				},

				transition: function (direction) { // update container.style.left and container.style.right
					var currentPosition = parseInt(this.container.style.left) || 0,
						container = this.container,
						nextPosition,

						that = this;

					if (!this.transitioning) {
						this.transitioning = true;

						if (direction < 0 && this.currentSlide > 1) { // left
							nextPosition = currentPosition + this.width;

							this.currentSlide--;

							this.animate({
								ease: animation.arc.two,
								duration: 300,
								tick: function (ordinate) {
									container.style.left = currentPosition + (nextPosition - currentPosition) * ordinate;
								},
								end: function () {
									that.transitioning = false;
								}
							});
						} else if (direction > 0 && this.currentSlide < this.lastSlide) { // right
							nextPosition = currentPosition - this.width;

							this.currentSlide++;

							this.animate({
								ease: animation.arc.two,
								duration: 300,
								tick: function (ordinate) {
									container.style.left = currentPosition + (nextPosition - currentPosition) * ordinate;
								},
								end: function () {
									that.transitioning = false;
								}
							});
						} else {
							this.transitioning = false;
						}
					}
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