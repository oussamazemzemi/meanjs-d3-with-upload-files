'use strict';

//Adverts service used to communicate Adverts REST endpoints
angular.module('adverts').factory('Adverts', ['$resource',
	function($resource) {
		return $resource('adverts/:advertId', { advertId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);