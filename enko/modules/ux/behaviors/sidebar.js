// sidebar.js



enko.inject(['ux/behavior', 'utils'],
	function (Behavior, utils) {

		var SideBar = enko.classify({

			extend: Behavior,

			initialize: function (node, options) {
				var header = document.createElement('div'),
					items = {},
					name,
					id;

				Behavior.call(node);

				node.classList.add('SideBar'); // to-do: change how classes are added
				header.classList.add('SideBarHeader');
				node.appendChild(header);

				header.innerHTML = options && options.title || SideBar.title;

				utils.walkTree(function (element) {
					name = element.getAttribute('name');
					id = element.id;

					if (name && id) {
						items[name] = '#' + id; // for the href links later
						console.log(name);
					}
				});

				var link,
					indicator = document.createElement('div');

				indicator.classList.add('SideBarItemIndicator');

				for (var item in items) {
					link = document.createElement('a');
					link.innerHTML = item;

					link.classList.add('SideBarItem');
					link.setAttribute('href', items[item]);
					node.appendChild(link);

					// link.insertBefore(indicator, link.firstElementChild);
				}

				document.addEventListener('scroll', function (evt) {
					console.log(window.pageYOffset);
				});
			},

			statics: {
				title: 'Nameless'
			}

		});

		enko.define('ux/behaviors/sidebar', SideBar);

	}
);