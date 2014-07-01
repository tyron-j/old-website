// scalable.js



enko.inject(['ui/animation', 'ui/widget'],
	function (animation, Widget) {

		var Scalable = enko.classify({

			extend: Widget,

			initialize: function (node, options) {
				Widget.call(this, node);

				var size = 0,
					max = options && options.max || Scalable.max,
					from,

					that = this;

				this.handle({
					mouseover: function () {
						from = size;

						that.animate({
							ease: animation.arc.two,
							tick: function (ordinate) {
								size = from + (max - from) * ordinate;
								node.style.webkitTransform = 'scale(' + (1 + size) + ', ' + (1 + size) + ')';
							}
						})
					},
					mouseout: function () {
						from = size;

						that.animate({
							ease: animation.arc.three,
							tick: function (ordinate) {
								size = from * ordinate;
								node.style.webkitTransform = 'scale(' + (1 + size) + ', ' + (1 + size) + ')';
							}
						})
					}
				})
			},

			statics: {
				max: 0.1
			}

		});

		enko.define('ui/widgets/scalable', Scalable);

	}
);