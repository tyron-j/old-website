// Behavior.js



Root.export('UI.Behavior', Root.classify({

	initialize: function (node) {
		this.node = node;
	},

	methods : {

		animate: function (options) {
			clearInterval(this.animation);

			if (options.begin){ // need to call clearInterval first, so the begin function is part of the options parameter
				options.begin();
			}

			var start = new Date(),

				ease = options.ease,
				tick = options.tick,
				delay = options.delay || 10,
				duration = options.duration || 500;
				
			this.animation = setInterval(function () {
				progress = (new Date() - start) / duration;

				if (progress > 1){
					progress = 1;
				}

				tick(ease(progress));

				if (progress == 1){
					clearInterval(this.animation);

					if (options.end){
						options.end();
					}
				}
			}, delay);
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

		setStyle: function (styles) { // needs testing
			Root.consolidate(this.node.style, styles, true);
		},

		destroy: function () {
			this.node.parentNode.removeChild(this.node);
			// this = null; // needs testing
		}
		
	}

}));