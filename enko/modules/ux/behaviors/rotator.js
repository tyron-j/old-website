// rotator.js



enko.inject(['ux/animation', 'ux/behavior'],
	function (animation, Behavior) {

		var Rotator = enko.classify({
			
			extend: Behavior,

			initialize: function (node, options) {
				Behavior.call(this, node);

				var rotation = 0,
					perspective = options && options.perspective || Rotator.perspective,
					axis = options && options.axis || Rotator.axis,
					max = options && options.max || Rotator.max,
					parent = node.parentElement, // to-do: remove this later
					from,

					that = this;

				parent.style.webkitPerspective = perspective;

				(new Behavior(parent)).handle({ // to-do: change this later
					mouseover: function () {
						from = rotation;

						that.animate({
							ease: animation.linear.up,
							tick: function (ordinate) {
								rotation = from + (max - from) * ordinate;
								node.style.webkitTransform = 'rotate' + axis + '(' + rotation + 'deg)';
							}
						});
					},
					mouseout: function () {
						from = rotation;

						that.animate({
							ease: animation.linear.down,
							tick: function (ordinate) {
								rotation = from * ordinate;
								node.style.webkitTransform = 'rotate' + axis + '(' + rotation + 'deg)';
							}
						});
					}
				});
			},

			statics: {
				perspective: 500,
				axis: 'X',
				max: 360
			}

		});

		enko.define('ux/behaviors/rotator', Rotator);

	}
)