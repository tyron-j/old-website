// animation.js



enko.define('ui/animation', {

	linear: {
		up: function(progress){
			return progress;
		},
		down: function(progress){
			return 1 - progress;
		}
	},

	arc: {
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