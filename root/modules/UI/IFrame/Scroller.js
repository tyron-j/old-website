// Scroller.js



Root.import(['Root.UI.Behavior'],
	function (Behavior) {

		Root.export('Root.UI.IFrame.Scroller', Root.classify({

			extend: Behavior,

			initialize: function (node, mutual) {
				this.callSuper('initialize', node);
				
			}

		}));

	}
)