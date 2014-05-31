// Behavior.js



Root.export('Root.UI.Behavior', Root.classify({

	initialize: function (node) {
		this.node = node;
		node.instance = this;
	},

	methods: {
		handleEvents: function (events) {
			var node = this.node;

			for (evt in events) {
				node.handle(evt, events[evt]);
			}
		}
	}

}));