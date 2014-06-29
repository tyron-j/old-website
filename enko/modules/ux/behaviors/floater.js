// floater.js



enko.inject(['ux/animation', 'ux/behavior'],
	function (animation, Behavior) {

		var Floater = enko.classify({
			
			extend: Behavior,

			initialize: function (node, options) {
				Behavior.call(this, node);

				var altitude = 0,
					max = options && options.max || Floater.max,
					from,

					that = this;

				this.handle({
					mouseover: function () {
						from = altitude;

						that.animate({
							ease: animation.arc.two,
							tick: function (ordinate) {
								altitude = from + (max - from) * ordinate;
								node.style.bottom = altitude + 'px';
							}
						});
					},
					mouseout: function () {
						from = altitude;

						that.animate({
							ease: animation.arc.three,
							tick: function (ordinate) {
								altitude = from * ordinate;
								node.style.bottom = altitude + 'px';
							}
						});
					}
				});
			},

			statics: {
				max: 25
			}

		});

		enko.define('ux/behaviors/floater', Floater);

	}
)