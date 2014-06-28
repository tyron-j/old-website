// liftable.js



enko.inject(['uix/animation', 'uix/behavior'],
	function (animation, Behavior) {

		var Liftable = enko.classify({
			
			extend: Behavior,

			initialize: function (node, options) {
				Behavior.call(this, node);

				var pos = 0,
					max = options && options.max || Liftable.max,
					from,

					that = this;

				this.handle({
					mouseover: function () {
						from = pos;

						that.animate({
							ease: animation.arc.two,
							tick: function (ordinate) {
								pos = from + (max - from) * ordinate;
								node.style.bottom = pos + 'px';
							}
						});
					},
					mouseout: function () {
						from = pos;

						that.animate({
							ease: animation.arc.three,
							tick: function (ordinate) {
								pos = from * ordinate;
								node.style.bottom = pos + 'px';
							}
						});
					}
				});
			},

			statics: {
				max: 25
			}

		});

		enko.define('uix/behaviors/liftable', Liftable);

	}
)