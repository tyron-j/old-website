// sidebar.js

// to-do: find the total offsetTop of each element; get the common parent's offsetTop and add it to the rest

enko.inject(['ui/dom', 'ui/widget', 'utils'],
	function (dom, Widget, utils) {

		var SideBar = enko.classify({

			extend: Widget,

			initialize: function (node, options) {
				Widget.call(this, node, options);

				var header = dom.create('div'),
					elements = [],
					ranges = [],
					items = {},
					name,
					id,

					that = this;

				// header
				header.classList.add('SideBarHeader');
				node.appendChild(header);

				header.innerHTML = options.title || SideBar.title;

				utils.walkTree(function (element) { // to-do: get the root element from options
					name = element.getAttribute('name');
					id = element.id;

					if (name && id) {
						items[name] = '#' + id; // for the href links later

						elements.push(element);
						ranges.push(element.offsetTop);
					}
				});

				ranges.push(Infinity);

				var link,
					indicator = dom.create('div');

				indicator.classList.add('SideBarItemIndicator');

				// items
				for (var item in items) {
					link = dom.create('a');
					link.innerHTML = item;

					link.classList.add('SideBarItem');
					link.setAttribute('href', items[item]);
					node.appendChild(link);
				}

				items = node.getElementsByClassName('SideBarItem');

				this.setIndicator(indicator, items, ranges);

				document.addEventListener('scroll', function () {
					that.setIndicator(indicator, items, ranges);
				});

				window.addEventListener('resize', function () {
					that.reset(elements, ranges);
				});
			},

			methods: {

				setIndicator: function (indicator, items, ranges) {
					var pageYOffset = window.pageYOffset;

					ranges.some(function (boundary, idx, arr) {
						if (pageYOffset >= boundary && pageYOffset < arr[idx + 1]) {
							items[idx].insertBefore(indicator, items[idx].firstElementChild); // to-do: find a cleaner way of doing this
							return true;
						}
					});
				},

				reset: function (elements, ranges) {
					elements.forEach(function (element, idx) {
						ranges[idx] = element.offsetTop;
					});
				}

			},

			statics: {
				title: 'Nameless',
				options: {
					class: 'SideBar',
					style: {
						width: 250
					}
				}
			}

		});

		enko.define('ui/widgets/sidebar', SideBar);

	}
);