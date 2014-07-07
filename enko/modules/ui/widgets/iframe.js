// iframe.js

// to-do: make and test changes

enko.inject(['ajax', 'task', 'ui/dom', 'ui/widget'],
	function (ajax, Task, dom, Widget) {

		enko.define('ui/widgets/iframe', enko.classify({

			extend: Widget,

			initialize: function (node, options) {
				Widget.call(this, node, options);

				// components
				var scrollBar = node.appendChild(dom.create('div')),
					scroller = scrollBar.appendChild(dom.create('div')),
					scrollWindow = node.appendChild(dom.create('div')),
					scrollContent = scrollWindow.appendChild(dom.create('div')),

					that = this;

				// classes
				scrollBar.classList.add('ScrollBar');
				scroller.classList.add('Scroller');
				scrollWindow.classList.add('ScrollWindow');
				scrollContent.classList.add('ScrollContent');

				// styles
				node.style.marginLeft = -node.offsetWidth / 2; // to-do: implement dom.setInCenter
				node.style.marginTop = -node.offsetHeight / 2;

				// settings
				this.scrollerMax = scrollBar.offsetHeight - scroller.offsetHeight;
				this.doc = new Widget(document);

				// get content
				this.getContent(options.src).onSuccess(function (content) { // to-do: allow hard-coded content
					scrollContent.innerHTML = content;
					that.scrollContentMax = scrollContent.offsetHeight - scrollWindow.offsetHeight;
				});

				// event handlers
				scrollBar.addEventListener('mousedown', function (evt) {
					if (scrollBar === evt.target) {
						that.currentTop = parseInt(scroller.style.top) || 0;

						that.setAbsoluteTop(scrollBar); // to-do: can this be called just once?
						that.moveScroller(evt, scrollBar, scroller, scrollContent);
					}
				});

				scroller.addEventListener('mousedown', function (evt) {
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
				});

				scrollWindow.addEventListener('mousewheel', function (evt) {
					evt.preventDefault(); // prevent default scrolling

					that.currentTop = parseInt(scroller.style.top) || 0;

					evt.wheelDelta > 0 ? that.scrollUp(scroller, scrollContent) : that.scrollDown(scroller, scrollContent);
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

			},

			statics: {
				options: {
					class: 'IFrame',
					style: {
						width: 1000,
						height: 625
					}
				}
			}

		}));

	}
);