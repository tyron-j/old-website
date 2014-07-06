// navbar.js



enko.inject(['ui/widget', 'ui/widgets/floater', 'ui/dom'],
	function (Widget, Floater, dom) {

		var NavBar = enko.classify({

			extend: Widget,

			initialize: function (node, options) {
				Widget.call(this, node, options);

				var navContent = dom.create('div');

				// CSS classes
				node.classList.add('NavBar');
				navContent.classList.add('NavContent');

				node.style.width = options.width;
				node.style.height = options.height;
				node.style.left = '50%';
				node.style.marginLeft = -node.offsetWidth / 2;
				node.style.zIndex = 1;
				navContent.style.marginTop = -options.height;

				// add content
				node.appendChild(navContent);
				navContent = new Floater(navContent, {
					max: -options.height
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
					width: 750,
					height: 50
				}
			}

		});

		enko.define('ui/widgets/navbar', NavBar);

	}
);