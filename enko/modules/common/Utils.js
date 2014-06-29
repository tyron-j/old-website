// utils.js



(function () {

	function toStr(obj) {
		return Object.prototype.toString.call(obj);
	}

	function walkTree(root, callback) { // consider using a TreeWalker
		if (!callback) { // root parameter is optional
			callback = root;
			root = document.body;
		}

		callback(root);
		
		[].forEach.call(root.children, function (child) { // to-do: is this too memory-intensive?
			walkTree(child, callback);
		});
	}

	enko.define('utils', {

		consolidate: function (objects, overwrite) { // to-do: consider making overwrite true by default
			var obj1 = objects[0];

			for (var i = 1, len = objects.length, obj2; i < len; i++) {
				obj2 = objects[i];

				if (overwrite) {
					for (var key in obj2) {
						obj1[key] = obj2[key];
					}
				} else {
					for (var key in obj2) {
						if (!(key in obj1)) {
							obj1[key] = obj2[key];
						}
					}
				}
			}

			return obj1;
		},

		contains: function (arr, item) { // needs testing
			return arr.indexOf(item) >= 0;
		},

		walkTree: walkTree,

		// validators:

		isElement: function (unknown) {
			return toStr(unknown) === '[object HTMLDivElement]';
		},

		isArray: function (unknown) {
			return toStr(unknown) === '[object Array]';
		},

		isFunction: function (unknown) {
			return toStr(unknown) === '[object Function]';
		},

		isObject: function (unknown) {
			return toStr(unknown) === '[object Object]';
		},

		isRegExp: function (unknown) {
			return toStr(unknown) === '[object RegExp]';
		},

		isBoolean: function (unknown) {
			return typeof unknown === 'boolean';
		},

		isNumber: function (unknown) {
			return typeof unknown === 'number' && unknown.toString() !== 'NaN' && unknown.toString() !== 'Infinity';
		},

		isString: function (unknown) {
			return typeof unknown === 'string';
		}

	});

})();