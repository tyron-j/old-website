// Overlay.js



Root.import(['UI.Animation', 'UI.Behavior'],
	function (Animation, Behavior) {

		Root.export('UI.Overlay', Root.classify({

			extend: Behavior,

			initialize: function (node, options) {
				this.callSuper('initialize', [node]);

				var opa = 1,
					max = 1, // set these with options or statics later
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