// floater.js



enko.inject(['ui/animation', 'ui/widget'],
	function (animation, Widget) {

		var Floater = enko.classify({
			
			extend: Widget,

			initialize: function (node, options) {
				Widget.call(this, node, options);

				var altitude = 0,
					max = options.max,
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
				options: {
					max: 25
				}
			}

		});

		enko.define('ui/widgets/floater', Floater);

	}
)