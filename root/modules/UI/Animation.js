// Animation.js



Root.addProperties(Element.prototype, {

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
	}

});

Root.export('Root.UI.Animation', {

	Linear: {
		up: function(progress){
			return progress;
		},
		down: function(progress){
			return 1 - progress;
		}
	},

	Circle: {
		one: function(progress){
			return Math.sin(Math.acos(progress));
		},
		two: function(progress){
			return Math.sin(Math.acos(progress - 1));
		},
		three: function(progress){
			return 1 - Math.sin(Math.acos(progress - 1));
		},
		four: function(progress){
			return 1 - Math.sin(Math.acos(progress));
		}
	}

});