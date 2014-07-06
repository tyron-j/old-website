// utils.js



(function () {

	function toStr(obj) {
		return Object.prototype.toString.call(obj);
	}

	// validators:

	function isElement(unknown) {
		return toStr(unknown) === '[object HTMLDivElement]';
	}

	function isArray(unknown) {
		return toStr(unknown) === '[object Array]';
	}

	function isFunction(unknown) {
		return toStr(unknown) === '[object Function]';
	}

	function isObject(unknown) {
		return toStr(unknown) === '[object Object]';
	}

	function isRegExp(unknown) {
		return toStr(unknown) === '[object RegExp]';
	}

	function isBoolean(unknown) {
		return typeof unknown === 'boolean';
	}

	function isNumber(unknown) {
		return typeof unknown === 'number' && unknown.toString() !== 'NaN' && unknown.toString() !== 'Infinity';
	}

	function isString(unknown) {
		return typeof unknown === 'string';
	}

	function isUndefined(unknown) {
		return unknown === void(0);
	}

	// array manipulators:

	function contains(arr, item) { // needs testing
		return arr.indexOf(item) >= 0;
	}

	// object manipulators:

	function occupy(objects, recursive) { // fills in the empty keys of an object
		var occupied = objects.shift();

		objects.forEach(function (obj) {
			for (var key in obj) {
				if (isUndefined(occupied[key])) { // shallow
					occupied[key] = obj[key];
				} else if (recursive && isObject(occupied[key]) && isObject(obj[key])) { // deep
					occupy([occupied[key], obj[key]], true);
				}
			}
		});

		return occupied;
	}

	function merge(objects, recursive) { // merge all objects into one object; overwrite object to the left
		var merged = objects.shift();

		objects.forEach(function (obj) {
			for (var key in obj) {
				if (recursive && isObject(merged[key]) && isObject(obj[key])) { // deep
					merge([merged[key], obj[key]], true);
				} else { // shallow
					merged[key] = obj[key];
				}
			}
		});

		return merged;
	}

	// dom manipulators:

	function walkTree(root, callback) { // to-do: consider moving under the dom module
		if (!callback) { // root parameter is optional
			callback = root;
			root = document.body;
		}

		callback(root);
		
		[].forEach.call(root.children, function (child) { // to-do: is this too memory-intensive?
			walkTree(child, callback);
		});
	}

	// public API:

	enko.define('utils', {
		toStr: toStr,

		isElement: isElement,
		isArray: isArray,
		isFunction: isFunction,
		isObject: isObject,
		isRegExp: isRegExp,
		isBoolean: isBoolean,
		isNumber: isNumber,
		isString: isString,
		isUndefined: isUndefined,

		contains: contains,

		occupy: occupy,
		merge: merge,

		walkTree: walkTree
	});

})();