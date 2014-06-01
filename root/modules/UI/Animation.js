// Animation.js



Root.addProperties(Element.prototype, {

	animate: function(options){
		clearInterval(this.animation);

		if (options.begin){ // need to call clearInterval first, so the begin function is part of the options parameter
			options.begin();
		}

		var start = new Date(),

			ease = options.ease,
			tick = options.tick,
			delay = options.delay || 10,
			duration = options.duration || 500,

			that = this;
			
		this.animation = setInterval(function(){
			progress = (new Date() - start) / duration;

			if (progress > 1){
				progress = 1;
			}

			tick.call(that, ease(progress)); // consider using bind instead

			if (progress == 1){
				clearInterval(that.animation);

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