// widget.js

// to-do: implement unit tests

enko.inject(['utils'],
	function (utils) {
		'use strict';

		var element, hash; // to-do: move these inside the function scope

		enko.define('ui/widget', enko.classify({

			initialize: function (node, options) {
				this.node = node;

				if (options) {
					utils.occupy([options, this.constructor.options], true);
					this.configure(options);
				}
			},

			methods : {

				// animation:

				animate: function (options) { // to-do: create a fallback in case requestAnimationFrame is not available
					cancelAnimationFrame(this.animation);

					if (options.begin) {
						options.begin();
					}

					var duration = options.duration || 500,
						ease = options.ease,
						tick = options.tick,
						that = this,

						progress,
						start,
						now;

					function draw(time) {
						start = start || time;
						now = time;
						progress = (now - start) / duration;

						if (progress > 1) {
							progress = 1;
						}

						tick(ease(progress));

						if (progress === 1) {
							cancelAnimationFrame(that.animation);

							if (options.end) {
								options.end();
							}
						} else {
							that.animation = requestAnimationFrame(draw);
						}
					}

					that.animation = requestAnimationFrame(draw);
				},

				// events:

				handle: function (evt, callback, useCapture) {
					var callbackName;

					if (!this.handlers){
						this.handlers = {}; // to allow the removal of event listeners later
					}

					if (typeof evt === 'object') { // for multiple events; needs testing
						useCapture = callback;

						for (var e in evt) {
							callback = evt[e];
							callbackName = callback.name || e;

							this.handlers[callbackName] = callback;
							this.node.addEventListener(e, callback, useCapture);
						}
					} else {
						callbackName = callback.name || evt;

						this.handlers[callbackName] = callback;
						this.node.addEventListener(evt, callback, useCapture);
					}
				},

				ignore: function (evt, callback, useCapture) {
					var callbackName;

					if (typeof evt === 'object') { // for multiple events; needs testing
						useCapture = callback;

						if (evt instanceof Array) { // element.ignore(['click', 'mouseover', 'mouseout'], true)
							var that = this;

							evt.forEach(function (e) {
								callback = that.handlers[e];

								that.node.removeEventListener(e, callback, useCapture);
								delete that.handlers[e];
							});
						} else { // element.ignore({ 'click': handler }, true)
							for (var e in evt) {
								callback = evt[e];
								callbackName = callback.name || e;

								this.node.removeEventListener(e, callback, useCapture);
								delete this.handlers[callbackName];
							}
						}
					} else {
						callbackName = callback && callback.name || evt;
						callback = callback || this.handlers[callbackName];

						this.node.removeEventListener(evt, callback, useCapture);
						delete this.handlers[callbackName];
					}
				},

				trigger: function (evtType) { // needs testing
					var evt = new Event(evtType);

					this.node.dispatchEvent(evt);
				},

				// dom manipulation:

				addClass: function (className) {
					this.node.classList.add(className);
				},

				configure: function (options) {
					if (options) {
						element = this.node;

						hash = options.attributes;

						for (var a in hash) {
							element.setAttribute(a, hash[a]);
						}

						hash = options.style;

						for (var s in hash) {
							element.style[s] = hash[s];
						}

						options.class && element.classList.add(options.class);
					}
				},

				destroy: function () {
					this.node.parentNode.removeChild(this.node);
					// this = null; // needs testing
				},

				insertAfter: function (newElement, reference) {
					this.node.insertBefore(newElement, reference.nextSibling);
				},

				stylize: function (styles) { // needs testing
					var nodeStyles = this.node.style;

					for (var style in styles) {
						nodeStyles[style] = styles[style];
					}
				}
				
			}

		}));

	}
);