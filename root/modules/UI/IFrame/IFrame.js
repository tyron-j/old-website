// IFrame.js



Root.import(['Root.UI.Behavior', 'Root.UI.IFrame.ScrollBar', 'Root.UI.IFrame.Scroller', 'Root.UI.IFrame.ScrollContent'],
	function (Behavior, ScrollBar, Scroller, ScrollContent) {

		Root.export('Root.UI.IFrame', Root.classify({

			extend: Behavior,

			initialize: function (node, options) { // needs testing
				this.callSuper('initialize', node);

				var scrollBar = node.appendChild(document.createElement('div')),
					scroller = scrollBar.appendChild(document.createElement('div')),
					scrollWindow = node.appendChild(document.createElement('div')),
					scrollContent = scrollWindow.appendChild(document.createElement('div')),

					content = node.innerHTML;
					node.innerHTML = '';

				if (!node.offsetWidth) {
					node.setStyle({
						width: Root.UI.IFrame.width,
						height: Root.UI.IFrame.height
					});
				}

				scrollBar.classList.add(options && options.scrollBarClass || 'ScrollBar');
				scroller.classList.add(options && options.scrollerClass || 'Scroller');
				scrollWindow.classList.add(options && options.scrollWindowClass || 'ScrollWindow');
				scrollContent.classList.add(options && options.scrollContentClass || 'ScrollContent');

				new ScrollBar(scrollBar);
				new ScrollBar(scroller);
				new ScrollBar(scrollContent);

				scrollContent.innerHTML = content;
			},

			statics: {
				width: '500px',
				heightL '500px'
			}

		}));

	}
);