// interface.js



// UI Components:

Root.classify("Root.UI.Component", {

	initialize: function(node, config){
		this.node = node; // crucial for event handling
		node.instance = this;

		var defaults = this._class.defaults;

		for (var def in defaults){
			node[def] = defaults[def];
		}

		if (config){ // overwrite default values
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
				},
				duration: 300
			});
		},
		mouseout: function(){
			var from = this.opa;

			this.animate({
				ease: Root.Easers.Circle.two,
				tick: function(delta){
					this.opa = from + (this.max - from) * delta;
					this.style.opacity = this.opa;
				},
				duration: 300
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

Root.classify("Root.UI.ScrollBar", {

	extend: Root.UI.Component,

	initialize: function(node, config){
		this.callSuper(node, config);

		var scrollBar = node,
			scroller = scrollBar.scroller = scrollBar.firstElementChild,
			scrollWindow = scrollBar.nextElementSibling,
			content = scrollBar.scrollContent = scrollWindow.firstElementChild;

		content.max = content.offsetHeight - scrollWindow.offsetHeight;

		new Root.UI.Scroller(scroller);
	},

	methods: { // consider calling the methods within the element's context
		setAbsoluteTop: function(scrollBar){
			var absoluteTop = 0;

			for (var e = scrollBar; e; e = e.offsetParent){
				absoluteTop += e.offsetTop || 0;
			}

			scrollBar.absoluteTop = absoluteTop;
		},
		moveScroller: function(evt, scrollBar, scroller, content){
			if (scrollBar == Root.Event.getTarget(evt)){
				scroller.pos = parseInt(scrollBar.style.top) || 0;

				var cursorPos = evt.pageY - scrollBar.absoluteTop, // check compatibility
					delta = cursorPos - (scroller.pos + scroller.offsetHeight / 2);

				scroller.style.top = Math.max(Math.min(scroller.pos + delta, scroller.max), 0) + "px";

				this.reposition(scroller, content);
			}
		},
		reposition: function(scroller, content){
			var pos = parseInt(scroller.style.top);
			content.style.bottom = (pos / scroller.max) * content.max + "px";
		}
	},

	events: {
		mousedown: function(evt){
			var instance = this.instance;
			
			instance.setAbsoluteTop(this);
			instance.moveScroller(evt, this, this.scroller, this.scrollContent);
		}
	}

});

Root.classify("Root.UI.Scroller", { // clean up the code

	extend: Root.UI.Component,

	initialize: function(node, config){
		this.callSuper(node, config);

		var scroller = node,
			scrollBar = scroller.scrollBar = scroller.parentNode;

		scroller.scrollContent = scrollBar.scrollContent;
		scroller.max = scrollBar.offsetHeight - scroller.offsetHeight;
	},

	methods: {
		startDrag: function(evt, scroller, scrollBar, content, reposition){
			var delta = evt.clientY - scroller.initialY;

			scroller.style.top = Math.max(Math.min(scroller.pos + delta, scroller.max), 0) + "px";
			reposition(scroller, content); // see if there is a faster way to do this
		},
		stopDrag: function(){
			document.body.ignore("mousemove");
			document.body.ignore("mouseup");
		}
	},

	events: {
		mousedown: function(evt){
			evt.preventDefault();

			this.pos = parseInt(this.style.top) || 0; // check if this is necessary
			this.initialY = evt.clientY; // check compatibility

			var scroller = this,
				scrollBar = this.scrollBar,
				content = this.scrollContent,

				startDrag = this.instance.startDrag,
				stopDrag = this.instance.stopDrag,

				reposition = scrollBar.instance.reposition;

			document.body.handle("mousemove", function(evt){
				startDrag(evt, scroller, scrollBar, content, reposition);
			});
			document.body.handle("mouseup", stopDrag);
		}
	}

});

Root.classify("Root.UI.ScrollContent", {

	extend: Root.UI.Component,

	initialize: function(node, config){
		this.callSuper(node, config);

		var content = node;

		content.scroller = content.parentNode.previousElementSibling.firstElementChild;
	},

	methods: {
		scrollUp: function(content, scroller){
			scroller.style.top = Math.max(scroller.pos - 50, 0) + "px";
			scroller.scrollBar.instance.reposition(scroller, content);
		},
		scrollDown: function(content, scroller){
			scroller.style.top = Math.min(scroller.pos + 50, scroller.max) + "px";
			scroller.scrollBar.instance.reposition(scroller, content);
		}
	},

	events: {
		mousewheel: function(evt){
			evt.preventDefault();

			var scroller = this.scroller,
				instance = this.instance;

			scroller.pos = parseInt(scroller.style.top) || 0;

			evt.wheelDelta > 0 ? instance.scrollUp(this, scroller) : instance.scrollDown(this, scroller); // check compatibility
		}
	}

});

Root.UI.initialize();