// interface.js



// UI Components:

Root.classify("Root.UI.Component", { // consider renaming

	initialize: function(node, config){
		this.node = node;
		config = config || this._class.defaults;
		
		for (var part in config){
			node[part] = config[part];
		}
	}

});

Root.classify("Root.UI.LinkNode", {

	extend: Root.UI.Component,

	events: {
		mouseover: function(){
			var from = this.height;

			this.animate({
				begin: function(){
					console.log("Lifting began");
				},
				ease: Root.Easers.Circle.two,
				tick: function(delta){ // consider creating a module that contains all of the animation functions
					this.height = from + (this.max - from) * delta;
					this.style.bottom = this.height + "px";
				},
				duration: 500,
				end: function(){
					console.log("Lifting ended");
				}
			});
		},
		mouseout: function(){
			var from = this.height;

			this.animate({
				begin: function(){
					console.log("Dropping began");
				},
				ease: Root.Easers.Circle.three,
				tick: function(delta){
					this.height = from * delta;
					this.style.bottom = this.height + "px";
				},
				duration: 500,
				end: function(){
					console.log("Dropping ended");
				}
			});
		}
	},

	statics: {
		defaults: {
			height: 0,
			max: 50
		}
	}

});

Root.UI.initialize();