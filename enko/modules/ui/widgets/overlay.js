// overlay.js



enko.inject(['ui/animation', 'ui/widget'],
	function (animation, Widget) {

		enko.define('ui/widgets/overlay', enko.classify({

			extend: Widget,

			initialize: function (node, options) {
				Widget.call(this, node);

				var opacity = 1,
					max = 1,
					from,

					that = this;

				this.handle({
					mouseover: function () {
						from = opacity;

						that.animate({
							ease: animation.arc.three,
							tick: function (ordinate) {
								opacity = from * ordinate;
								node.style.opacity = opacity;
							},
							duration: 300
						});
					},
					mouseout: function () {
						from = opacity;

						that.animate({
							ease: animation.arc.two,
							tick: function (ordinate) {
								opacity = from + (max - from) * ordinate;
								node.style.opacity = opacity;
							},
							duration: 300
						});
					}
				});
			}

		}));

	}
);