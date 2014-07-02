// dom.js



enko.inject(['utils', 'ui/widget'],
	function (utils, Widget) {

		enko.define('ui/dom', {

			wrap: function (node) { // wraps the node as a widget to allow the usage of widget methods
				return new Widget(node);
			},

			stylize: function (node, styles) {
				Widget.prototype.stylize.call({
					node: node
				}, styles);
			}

		});

	}
);