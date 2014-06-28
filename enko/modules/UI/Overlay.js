// Overlay.js



enko.inject(['UI/Animation', 'UI/Behavior'],
	function (Animation, Behavior) {

		enko.define('UI/Overlay', enko.classify({

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
							ease: Animation.Circle.three,
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
							ease: Animation.Circle.two,
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