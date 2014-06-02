// ScrollBar.js

Root.import(['Root.UI.Behavior'],
	function (Behavior) {

		Root.export('Root.UI.IFrame.ScrollBar', Root.classify({

			extend: Behavior,

			initialize: function (node) {
				this.callSuper('initialize', node);

				var scroller = node.firstElementChild,
					scrollWindow = node.nextElementSibling,
					scrollContent = scrollWindow.firstElementChild,

					max = scrollContent.offsetHeight - scrollWindow.offsetHeight;

				node.handle({
					mousedown: function (evt) {
						//
					}
				});
			}

		}));

	}
)