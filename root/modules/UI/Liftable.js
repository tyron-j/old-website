// Liftable.js



Root.import(['UI/Animation', 'UI/Behavior'],
	function (Animation, Behavior) {

		var Liftable = Root.classify({
			
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

		});

		Root.export('UI/Liftable', Liftable);

	}
)