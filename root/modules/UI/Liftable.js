// Liftable.js



Root.import(['Root.UI.Animation', 'Root.UI.Behavior'],
	function (Animation, Behavior) {

		Root.export('Root.UI.Liftable', Root.classify({
			
			extend: Behavior,

			initialize: function (node, options) { // currently, extra parameters cannot be passed in
				this.callSuper('initialize', [node]);

				var pos = 0,
					max = options && options.max || Root.UI.Liftable.max,
					from;

				node.handle({
					mouseover: function () {
						from = pos;

						this.animate({
							ease: Animation.Circle.two,
							tick: function (ordinate) {
								pos = from + (max - from) * ordinate;
								this.style.bottom = pos + 'px';
							}
						});
					},
					mouseout: function () {
						from = pos;

						this.animate({
							ease: Animation.Circle.three,
							tick: function (ordinate) {
								pos = from * ordinate;
								this.style.bottom = pos + 'px';
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