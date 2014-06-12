// IFrame.js



Root.import(['UI/Behavior'],
	function (Behavior) {

		Root.export('UI/IFrame', Root.classify({

			extend: Behavior,

			initialize: function (node, options) {
				this.callSuper('initialize', node);

				// create essential elements
				var scrollBar = node.appendChild(document.createElement('div')),
					scroller = scrollBar.appendChild(document.createElement('div')),
					scrollWindow = node.appendChild(document.createElement('div')),
					scrollContent = scrollWindow.appendChild(document.createElement('div')),

					that = this;

				// initialize styles
				scrollBar.classList.add(options && options.scrollBarClass || 'ScrollBar');
				scroller.classList.add(options && options.scrollerClass || 'Scroller');
				scrollWindow.classList.add(options && options.scrollWindowClass || 'ScrollWindow');
				scrollContent.classList.add(options && options.scrollContentClass || 'ScrollContent');

				// initialize settings
				this.scrollerMax = scrollBar.offsetHeight - scroller.offsetHeight;
				this.scrollContentMax = scrollContent.offsetHeight - scrollWindow.offsetHeight;
				this.body = new Behavior(document.body);

				// event handlers

				(new Behavior(scrollBar)).handle({
					mousedown: function (evt) {
						if (scrollBar === evt.target) {
							that.currentTop = parseInt(scroller.style.top) || 0;

							that.setAbsoluteTop(scrollBar); // can this be called just once?
							that.moveScroller(evt, scrollBar, scroller, scrollContent);
						}
					}
				});

				(new Behavior(scroller)).handle({
					mousedown: function (evt) {
						evt.preventDefault();

						that.currentTop = parseInt(scroller.style.top) || 0;
						that.initialY = evt.clientY;

						that.body.handle({
							mousemove: function (evt) {
								that.startDrag(evt, scroller, scrollContent);
							},
							mouseup: function () {
								that.stopDrag();
							}
						});
					}
				});

				(new Behavior(scrollWindow)).handle({
					mousewheel: function (evt) {
						evt.preventDefault(); // prevent default scrolling

						that.currentTop = parseInt(scroller.style.top) || 0;

						evt.wheelDelta > 0 ? that.scrollUp(scroller, scrollContent) : that.scrollDown(scroller, scrollContent);
					}
				});
			},

			methods: {

				setAbsoluteTop: function (scrollBar) {
					var absoluteTop = 0;

					for (var e = scrollBar; e; e = e.offsetParent) {
						absoluteTop += e.offsetTop || 0;
					}

					this.absoluteTop = absoluteTop;
				},

				moveScroller: function (evt, scrollBar, scroller, scrollContent) {
					var cursorPos = evt.pageY - this.absoluteTop,
						delta = cursorPos - (this.currentTop + scroller.offsetHeight / 2);

					scroller.style.top = Math.max(Math.min(this.currentTop + delta, this.scrollerMax), 0) + 'px';

					this.reposition(scroller, scrollContent);
				},

				reposition: function (scroller, scrollContent) {
					var newPosition = parseInt(scroller.style.top);

					scrollContent.style.bottom = (newPosition / this.scrollerMax) * this.scrollerContentMax + 'px';
				},

				startDrag: function (evt, scroller, scrollContent) {
					var delta = evt.clientY - this.initialY;

					scroller.style.top = Math.max(Math.min(this.currentTop + delta, this.scrollerMax), 0) + 'px';

					this.reposition(scroller, scrollContent);
				},

				stopDrag: function () {
					this.body.ignore(['mousemove', 'mouseup']);
				},

				scrollUp: function (scroller, scrollContent) {
					scroller.style.top = Math.max(this.currentTop - 50, 0) + 'px';

					this.reposition(scroller, scrollContent);
				},

				scrollDown: function (scroller, scrollContent) {
					scroller.style.top = Math.min(this.currentTop + 50, this.scrollerMax) + 'px';

					this.reposition(scroller, scrollContent);
				}

			}

		}));

	}
);