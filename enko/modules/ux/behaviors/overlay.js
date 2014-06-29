// overlay.js



enko.inject(['ux/animation', 'ux/behavior'],
	function (animation, Behavior) {

		enko.define('ux/behaviors/overlay', enko.classify({

			extend: Behavior,

			initialize: function (node, options) {
				Behavior.call(this, node);

				var opa = 1,
					max = 1,
					from,

					that = this;

				this.handle({
					mouseover: function () {
						from = opa;

						that.animate({
							ease: animation.arc.three,
							tick: function (ordinate) {
								opa = from * ordinate;
								node.style.opacity = opa;
							},
							duration: 300
						});
					},
					mouseout: function () {
						from = opa;

						that.animate({
							ease: animation.arc.two,
							tick: function (ordinate) {
								opa = from + (max - from) * ordinate;
								node.style.opacity = opa;
							},
							duration: 300
						});
					}
				});
			}

		}));

	}
);