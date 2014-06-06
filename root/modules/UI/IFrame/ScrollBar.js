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

					IFrame.scrollContentMax = scrollContent.offsetHeight - scrollWindow.offsetHeight, // max isn't being used anywhere

					that = this;

				this.handle({
					mousedown: function (evt) {
						//
					}
				});
			},

			methods: {
				//
			}

		}));

	}
)