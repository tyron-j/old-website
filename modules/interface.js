// interface.js



// UI Components:

Root.classify("Root.UI.Component", { // consider renaming

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

Root.classify("Root.UI.InnerDiamond", {

	extend: Root.UI.Component,

	events: {
		mouseover: function(){
			var h = this.horizontal,
				v = this.vertical,

				from = this.pos;

			this.animate({
				ease: Root.Easers.Circle.two,
				tick: function(delta){
					this.pos = from + (this.max - from) * delta;
					this.style[h] = this.style[v] = this.pos + "px";
				},
				duration: 500
			});
		},
		mouseout: function(){
			var h = this.horizontal,
				v = this.vertical,
			
				from = this.pos;

			this.animate({
				ease: Root.Easers.Circle.three,
				tick: function(delta){
					this.pos = from * delta;
					this.style[h] = this.style[v] = this.pos + "px";
				},
				duration: 500
			});
		}
	},

	statics: {
		defaults: {
			horizontal: "left",
			vertical: "top",
			pos: 0,
			max: 25
		}
	}

});

Root.UI.initialize();