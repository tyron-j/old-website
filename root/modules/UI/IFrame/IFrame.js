// IFrame.js



Root.import(['UI.Behavior', 'UI.IFrame.ScrollBar', 'UI.IFrame.Scroller', 'UI.IFrame.ScrollContent'],
	function (Behavior, ScrollBar, Scroller, ScrollContent) {

		Root.export('UI.IFrame', Root.classify({

			extend: Behavior,

			initialize: function (node, options) { // needs testing
				this.callSuper('initialize', node);

				var scrollBar = node.appendChild(document.createElement('div')),
					scroller = scrollBar.appendChild(document.createElement('div')),
					scrollWindow = node.appendChild(document.createElement('div')),
					scrollContent = scrollWindow.appendChild(document.createElement('div')),

					// content = node.innerHTML; // consider changing this
					// node.innerHTML = '';

				/* can't access modules through Root anymore
				if (!node.offsetWidth) {
					this.setStyle({
						width: Root.UI.IFrame.width,
						height: Root.UI.IFrame.height
					});
				}
				*/

				scrollBar.classList.add(options && options.scrollBarClass || 'ScrollBar');
				scroller.classList.add(options && options.scrollerClass || 'Scroller');
				scrollWindow.classList.add(options && options.scrollWindowClass || 'ScrollWindow');
				scrollContent.classList.add(options && options.scrollContentClass || 'ScrollContent');

				/* this.scrollBar = */new ScrollBar(scrollBar, this);
				/* this.scroller = */new Scroller(scroller, this);
				/* this.scrollContent = */new ScrollContent(scrollContent, this);

				// this.scrollContent.innerHTML = content;
			},

			methods: {

				setAbsoluteTop: function (scrollBar) { // scrollBar is the element
					var absoluteTop = 0;

					for (var e = scrollBar; e; e = e.offsetParent) {
						absoluteTop += e.offsetTop || 0;
					}

					this.absoluteTop = absoluteTop;
				},

				moveScroller: function (evt, scrollBar, scroller, scrollContent) {
					if (scrollBar === evt.target) {
						this.currentTop = parseInt(scroller.style.top) || 0;

						var cursorPosition = evt.pageY - this.absoluteTop,
							delta = cursorPosition - (this.cursorPosition - scroller.offsetHeight / 2);

						scroller.style.top = Math.max(Math.min(this.currentTop + delta, this.scrollerMax), 0); + 'px';

						this.reposition(scroller, scrollContent);
					}
				},

				reposition: function (scroller, scrollContent) {
					var newPosition = parseInt(scroller.style.top);

					scrollContent.style.bottom = (newPosition / this.scrollerMax) * this.scrollerContentMax + 'px';
				},

				startDrag: function (evt, scroller, scrollContent) { // bind this to the IFrame instance as this.boundStartDrag
					var delta = evt.clientY - this.initialY;

					scroller.style.top = Math.max(Math.min(this.currentTop + delta, this.scrollerMax), 0) + 'px';

					this.reposition(scroller, scrollContent);
				},

				stopDrag: function () { // needs testing
					document.body.removeEventListener('mousemove', this.boundStartDrag);
					document.body.removeEventListener('mousemove', this.stopDrag);
				},

				scrollUp: function (scroller, scrollContent) {
					scroller.style.top = Math.max(this.currentTop - 50, 0) + 'px';

					this.reposition(scroller, scrollContent);
				},

				scrollDown: function (scroller, scrollContent) {
					scroller.style.top = Math.min(this.currentTop + 50, 0) + 'px';

					this.reposition(scroller, scrollContent);
				}

			}

			statics: {
				width: '500px',
				heightL '500px'
			}

		}));

	}
);