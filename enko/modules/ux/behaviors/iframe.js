// iframe.js

// to-do: make and test changes

enko.inject(['ajax', 'task', 'ux/behavior'],
	function (ajax, Task, Behavior) {

		enko.define('ux/behaviors/iframe', enko.classify({

			extend: Behavior,

			initialize: function (node, options) {
				Behavior.call(this, node);

				// create essential elements
				var scrollBar = node.appendChild(document.createElement('div')),
					scroller = scrollBar.appendChild(document.createElement('div')),
					scrollWindow = node.appendChild(document.createElement('div')),
					scrollContent = scrollWindow.appendChild(document.createElement('div')),

					that = this;

				options = options || {};

				// initialize styles
				node.classList.add('IFrame');
				scrollBar.classList.add('ScrollBar');
				scroller.classList.add('Scroller');
				scrollWindow.classList.add('ScrollWindow');
				scrollContent.classList.add('ScrollContent');

				node.style.width = options.width; // to-do: implement dom and dom.setInCenter
				node.style.height = options.height;
				node.style.marginLeft = -options.width / 2;
				node.style.marginTop = -options.height / 2;
				scrollWindow.style.backgroundColor = options.scrollWindowColor;
				scrollBar.style.backgroundColor = options.scrollBarColor;
				scroller.style.backgroundColor = options.scrollerColor;

				// initialize settings
				this.scrollerMax = scrollBar.offsetHeight - scroller.offsetHeight;
				this.doc = new Behavior(document);

				// get content
				this.getContent(options.src).onSuccess(function (content) { // to-do: allow hard-coded content
					scrollContent.innerHTML = content;
					that.scrollContentMax = scrollContent.offsetHeight - scrollWindow.offsetHeight;
				});

				// event handlers

				(new Behavior(scrollBar)).handle({
					mousedown: function (evt) {
						if (scrollBar === evt.target) {
							that.currentTop = parseInt(scroller.style.top) || 0;

							that.setAbsoluteTop(scrollBar); // to-do: can this be called just once?
							that.moveScroller(evt, scrollBar, scroller, scrollContent);
						}
					}
				});

				(new Behavior(scroller)).handle({
					mousedown: function (evt) {
						evt.preventDefault(); // to-do: check if this is necessary, and why

						that.currentTop = parseInt(scroller.style.top) || 0;
						that.initialY = evt.clientY;

						that.doc.handle({
							mousemove: function (evt) {
								that.handleDrag(evt, scroller, scrollContent);
							},
							mouseup: function () {
								that.ignoreDrag();
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

				getContent: function (url) {
					var task = new Task();

					ajax.get(url).onSuccess(function (res) { // to-do: handle fail
						task.resolve(res.replace(/\n/g, '<br>'));
					});

					return task;
				},

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

					scrollContent.style.bottom = (newPosition / this.scrollerMax) * this.scrollContentMax + 'px';
				},

				handleDrag: function (evt, scroller, scrollContent) {
					var delta = evt.clientY - this.initialY;

					scroller.style.top = Math.max(Math.min(this.currentTop + delta, this.scrollerMax), 0) + 'px';

					this.reposition(scroller, scrollContent);
				},

				ignoreDrag: function () {
					this.doc.ignore(['mousemove', 'mouseup']); // to-do: try attaching the listener to the document object instead so it handles mouseup outside of the viewport
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