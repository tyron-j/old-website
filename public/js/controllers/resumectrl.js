// resume controller

define(function () {
	'use strict';

	return [
		'$scope',

		'buttonBarSvc',
		
		function ($scope, buttonBarSvc) {
			$scope.resumeHeader = 'Tyron Jung';
			$scope.resumeContent = [{ // to-do: temporary hard-coding
					header: {
						icon: 'bar-chart',
						title: 'Employment History'
					},
					items: [{
						title: 'Front End Developer',
						company: 'Genesys',
						duration: 'May - Aug 2014',
						tasks: [
							'Hello my name is Tyron Jung and this is my website. I am currently testing the new-line functionality of this segment.',
							'B'
						]
					}, {
						title: 'Software Developer',
						company: 'Trapeze Group',
						duration: 'Sep - Dec 2013',
						tasks: [
							'Another test'
						]
					}]
				}, {
					header: {
						icon: 'lightbulb-o',
						title: 'Work Outside of Work'
					},
					items: [{
						title: 'Personal Website',
						duration: 'Ongoing',
						tasks: [
							'A'
						]
					}, {
						title: 'Genesys Hackathon',
						duration: 'Jul 2014',
						tasks: [
							'B'
						]
					}]
				}, {
					header: {
						icon: 'sitemap',
						title: 'Skills'
					},
					items: [{
						icon: 'html5',
						title: 'HTML 5'
					}, {
						icon: 'css3',
						title: 'CSS 3'
					}, {
						icon: 'git',
						title: 'Git'
					}, {
						icon: '',
						title: ''
					}, {
						icon: '',
						title: ''
					}, {
						icon: '',
						title: ''
					}, {
						icon: '',
						title: ''
					}, {
						icon: '',
						title: ''
					}]
				}
			];

			$scope.buttonBar = buttonBarSvc.resumeMenu;
		}
	];
});