// Behavior.js



Root.export('UI/Behavior', Root.classify({

	initialize: function (node) {
		this.node = node;
	},

	methods : {

		animate: function (options) { // to-do: create a fallback in case requestAnimationFrame is not available
			cancelAnimationFrame(this._animation);

			if (options.begin) {
				options.begin();
			}

			var duration = options.duration || 500,
				ease = options.ease,
				tick = options.tick,
				that = this,

				start,
				now;

			function draw (time) {
				start = start || time;
				now = time;
				progress = (now - start) / duration;

				if (progress > 1) {
					progress = 1;
				}

				tick(ease(progress));

				if (progress === 1) {
					cancelAnimationFrame(that._animation);

					if (options.end) {
						options.end();
					}
				} else {
					that._animation = requestAnimationFrame(draw);
				}
			}

			that._animation = requestAnimationFrame(draw);
		},

		handle: function (evt, callback, useCapture) {
			var callbackName;

			if (!this._handlers){
				this._handlers = {}; // to allow the removal of event listeners later
			}

			if (typeof evt === 'object') { // for multiple events; needs testing
				useCapture = callback;

				for (var e in evt) {
					callback = evt[e];
					callbackName = callback.name || e;

					this._handlers[callbackName] = callback;
					this.node.addEventListener(e, callback, useCapture);
				}
			} else {
				callbackName = callback.name || evt;

				this._handlers[callbackName] = callback;
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
						callback = that._handlers[e];

						that.node.removeEventListener(e, callback, useCapture);
						delete that._handlers[e];
					});
				} else { // element.ignore({ 'click': handler }, true)
					for (var e in evt) {
						callback = evt[e];
						callbackName = callback.name || e;

						this.node.removeEventListener(e, callback, useCapture);
						delete this._handlers[callbackName];
					}
				}
			} else {
				callbackName = callback && callback.name || evt;
				callback = callback || this._handlers[callbackName];

				this.node.removeEventListener(evt, callback, useCapture);
				delete this._handlers[callbackName];
			}
		},

		insertAfter: function (newElement, reference) {
			this.node.insertBefore(newElement, reference.nextSibling);
		},

		destroy: function () {
			this.node.parentNode.removeChild(this.node);
			// this = null; // needs testing
		}
		
	}

}));