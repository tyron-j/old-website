// navbar.js



enko.inject(['ui/widget', 'ui/widgets/floater', 'ui/dom'],
	function (Widget, Floater, dom) {

		var NavBar = enko.classify({

			extend: Widget,

			initialize: function (node, options) {
				Widget.call(this, node, options);

				var navContent = dom.create('div');

				// content class
				navContent.classList.add('NavContent');

				// styles
				node.style.marginLeft = -node.offsetWidth / 2;
				navContent.style.marginTop = -node.offsetHeight;

				// add content
				node.appendChild(navContent);

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