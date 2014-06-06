// Scroller.js



Root.import(['UI.Behavior'],
	function (Behavior) {

		Root.export('UI.IFrame.Scroller', Root.classify({

			extend: Behavior,

			initialize: function (node, mutual) {
				this.callSuper('initialize', node);
				
			}

		}));

	}
)