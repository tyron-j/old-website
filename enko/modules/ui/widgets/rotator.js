// rotator.js



enko.inject(['ui/animation', 'ui/widget'],
	function (animation, Widget) {

		var Rotator = enko.classify({
			
			extend: Widget,

			initialize: function (node, options) {
				Widget.call(this, node, options);

				var rotation = 0,
					perspective = options.perspective,
					axis = options.axis,
					max = options.max,
					parent = node.parentElement, // to-do: remove this later
					from,

					that = this;

				parent.style.webkitPerspective = perspective;

				(new Widget(parent)).handle({ // to-do: change this later
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
				options: {
					perspective: 500,
					axis: 'X',
					max: 360
				}
			}

		});

		enko.define('ui/widgets/rotator', Rotator);

	}
)