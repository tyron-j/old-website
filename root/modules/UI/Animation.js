// Animation.js



Root.export('UI.Animation', {

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