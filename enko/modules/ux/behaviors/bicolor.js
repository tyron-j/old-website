// bicolor.js

// to-do: change text color as well

enko.inject(['ux/animation', 'ux/behavior'],
	function (animation, Behavior) {

		var Bicolor = enko.classify({
			
			extend: Behavior,

			initialize: function (node, options) {
				Behavior.call(this, node);

				var primary = options && options.primary || Bicolor.primary, // array
					secondary = options && options.secondary || Bicolor.secondary, // array
					color = primary.slice(),
					from,
					to,

					that = this;

				node.style.backgroundColor = 'rgb(' + color.toString() + ')';

				function changeColor(ordinate) { // to-do: consider making this a prototype method
					for (var i = 0; i < 3; i++) {
						color[i] = Math.max(Math.min(parseInt(from[i] + (to[i] - from[i]) * ordinate), 255), 0); // parseInt because rgb doesn't process decimals
					}

					node.style.backgroundColor = 'rgb(' + color.toString() + ')';
				}

				this.handle({
					mouseover: function () {
						from = color.slice();
						to = secondary;

						that.animate({
							ease: animation.linear.up,
							tick: changeColor
						});
					},
					mouseout: function () {
						from = color.slice();
						to = primary;

						that.animate({
							ease: animation.linear.up,
							tick: changeColor
						});
					}
				});
			},

			statics: {
				primary: [0, 0, 0],
				secondary: [255, 255, 255]
			}

		});

		enko.define('ux/behaviors/bicolor', Bicolor);

	}
)