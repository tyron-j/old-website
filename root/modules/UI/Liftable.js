// Liftable.js



Root.import(['Root.UI.Animation', 'Root.UI.Behavior'],
	function (Animation, Behavior) {

		Root.export('Root.UI.Liftable', Root.classify({
			
			extend: Behavior,

			initialize: function (node, options) {
				this.callSuper('initialize', [node]);

				var pos = 0,
					max = options && options.max || Root.UI.Liftable.max,
					from,

					that = this;

				this.handle({
					mouseover: function () {
						from = pos;

						that.animate({
							ease: Animation.Circle.two,
							tick: function (ordinate) {
								pos = from + (max - from) * ordinate;
								node.style.bottom = pos + 'px';
							}
						});
					},
					mouseout: function () {
						from = pos;

						that.animate({
							ease: Animation.Circle.three,
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

		}));

	}
)