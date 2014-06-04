// ScrollContent.js



Root.import(['Root.UI.Behavior'],
	function (Behavior) {

		Root.export('Root.UI.IFrame.ScrollContent', Root.classify({

			extend: Behavior,

			initialize: function (node) {
				this.callSuper('initialize', node);
				
			}

		}));

	}
)