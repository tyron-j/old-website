// ScrollBar.js



Root.import(['Root.UI.Behavior'],
	function (Behavior) {

		Root.export('Root.UI.IFrame.ScrollBar', Root.classify({

			extend: Behavior,

			initialize: function (node, IFrame) {
				this.callSuper('initialize', node);

				var	scrollBar = node,
					scroller = node.firstElementChild,
					scrollWindow = node.nextElementSibling,
					scrollContent = scrollWindow.firstElementChild,

					that = this;

				this.handle({
					mousedown: function (evt) {
						IFrame.setAbsoluteTop(node);
					}
				});
			},

			methods: {
				//
			}

		}));

	}
)