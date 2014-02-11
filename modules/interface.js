// interface.js



// UI Components:

Root.classify("Root.UI.Component", {

	initialize: function(node, config){
		this.node = node;

		var defaults = this._class.defaults;

		for (var def in defaults){
			node[def] = defaults[def];
		}

		if (config){
			for (var con in config){
				node[con] = config[con];
			}
		}
	}

});

Root.classify("Root.UI.Diamond", { // liftable

	extend: Root.UI.Component,

	events: {
		mouseover: function(){
			var from = this.pos;

			this.animate({
				ease: Root.Easers.Circle.two,
				tick: function(delta){
					this.pos = from + (this.max - from) * delta;
					this.style.bottom = this.pos + "px";
				}
			});
		},
		mouseout: function(){
			var from = this.pos;

			this.animate({
				ease: Root.Easers.Circle.three,
				tick: function(delta){
					this.pos = from * delta;
					this.style.bottom = this.pos + "px";
				}
			});
		}
	},

	statics: {
		defaults: {
			pos: 0,
			max: 25
		}
	}

});

Root.classify("Root.UI.Overlay", {

	extend: Root.UI.Component,

	events: {
		mouseover: function(){
			var from = this.opa;

			this.animate({
				ease: Root.Easers.Circle.three,
				tick: function(delta){
					this.opa = from * delta;
					this.style.opacity = this.opa;
				}
			});
		},
		mouseout: function(){
			var from = this.opa;

			this.animate({
				ease: Root.Easers.Circle.two,
				tick: function(delta){
					this.opa = from + (this.max - from) * delta;
					this.style.opacity = this.opa;
				}
			});
		}
	},

	statics: {
		defaults: {
			opa: 1,
			max: 1
		}
	}

});

Root.UI.initialize();