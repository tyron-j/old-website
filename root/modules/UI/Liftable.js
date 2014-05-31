// Liftable.js



Root.import(['Root.Animation', 'Root.UI.Behavior'],
	function (Animation, Behavior) {

		Root.export('Root.UI.Liftable', Root.classify({
			
			extend: Behavior,

			initialize: function (node, max) {
				this.callSuper('initialize', [node]);

				var from = node.pos = 0;
				node.max = max || Root.UI.Liftable.max;

				node.handle({
					mouseover: function () {
						from = this.pos;

						this.animate({
							ease: Animation.Circle.two,
							tick: function (ordinate) {
								this.pos = from + (this.max - from) * ordinate;
								this.style.bottom = this.pos + 'px';
							}
						});
					},
					mouseout: function () {
						from = this.pos;

						this.animate({
							ease: Animation.Circle.three,
							tick: function (ordinate) {
								this.pos = from * ordinate;
								this.style.bottom = this.pos + 'px';
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