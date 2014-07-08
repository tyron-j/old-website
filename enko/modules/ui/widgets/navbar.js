// navbar.js



enko.inject(['ui/widget', 'ui/widgets/floater', 'ui/dom'],
	function (Widget, Floater, dom) {

		var NavBar = enko.classify({

			extend: Widget,

			initialize: function (node, options) {
				Widget.call(this, node, options);

				var navContent = node.appendChild(dom.create('div', {
					class: 'NavContent',
					style: {
						marginTop: -node.offsetHeight
					}
				}));

				// styles
				node.style.marginLeft = -node.offsetWidth / 2;

				// instantiate Floater
				navContent = new Floater(navContent, {
					max: -node.offsetHeight
				});

				// event handlers
				this.handle({
					mouseover: function () {
						navContent.trigger('mouseover'); // to-do: find a more efficient way of triggering child event
					},
					mouseout: function () {
						navContent.trigger('mouseout');
					}
				})
			},

			methods: {
				//
			},

			statics: {
				options: {
					class: 'NavBar',
					style: {
						width: 750,
						height: 50
					}
				}
			}

		});

		enko.define('ui/widgets/navbar', NavBar);

	}
);