'use strict';

//Setting up route
angular.module('adverts').config(['$stateProvider',
	function($stateProvider) {
		// Adverts state routing
		$stateProvider.
		state('listAdverts', {
			url: '/adverts',
			templateUrl: 'modules/adverts/views/list-adverts.client.view.html'
		}).
		state('createAdvert', {
			url: '/adverts/create',
			templateUrl: 'modules/adverts/views/create-advert.client.view.html'
		}).
		state('viewAdvert', {
			url: '/adverts/:advertId',
			templateUrl: 'modules/adverts/views/view-advert.client.view.html'
		}).
		state('editAdvert', {
			url: '/adverts/:advertId/edit',
			templateUrl: 'modules/adverts/views/edit-advert.client.view.html'
		});
	}
]);