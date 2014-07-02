// utils.js



(function () {

	function merge(objects, recursive) { // to-do: add an overwrite parameter before the recursive parameter
		var merged = objects.shift();

		objects.forEach(function (obj) {
			for (var key in obj) {
				if (recursive && isObject(merged[key])) {
					merge([merged[key], obj[key]], true);
				} else {
					merged[key] = obj[key];
				}
			}
		});

		return merged;
	}

	function isObject(unknown) {
		return toStr(unknown) === '[object Object]';
	}

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

		merge: merge,

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

		isObject: isObject,

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