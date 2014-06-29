// liftable.js



enko.inject(['ux/animation', 'ux/behavior'],
	function (animation, Behavior) {

		var Liftable = enko.classify({
			
			extend: Behavior,

			initialize: function (node, options) {
				Behavior.call(this, node);

				var position = 0,
					max = options && options.max || Liftable.max,
					from,

					that = this;

				this.handle({
					mouseover: function () {
						from = position;

						that.animate({
							ease: animation.arc.two,
							tick: function (ordinate) {
								position = from + (max - from) * ordinate;
								node.style.bottom = position + 'px';
							}
						});
					},
					mouseout: function () {
						from = position;

						that.animate({
							ease: animation.arc.three,
							tick: function (ordinate) {
								position = from * ordinate;
								node.style.bottom = position + 'px';
							}
						});
					}
				});
			},

			statics: {
				max: 25
			}

		});

		enko.define('ux/behaviors/liftable', Liftable);

	}
)