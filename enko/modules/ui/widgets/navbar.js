// navbar.js



enko.inject(['ui/widget', 'ui/widgets/floater', 'ui/dom'],
	function (Widget, Floater, dom) {

		var NavBar = enko.classify({

			extend: Widget,

			initialize: function (node, options) {
				Widget.call(this, node, options);

				var navContent = dom.create('div');

				// styles
				node.classList.add('NavBar');
				navContent.classList.add('NavContent');

				node.style.paddingTop = -options.height;

				navContent = new Floater(navContent, {
					max: -options.height
				});
			},

			methods: {
				//
			},

			statics: {
				options: {
					//
				}
			}

		});

	}
);