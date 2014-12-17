'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var adverts = require('../../app/controllers/adverts');

	// Adverts Routes
	app.route('/adverts')
		.get(adverts.list)
		.post(users.requiresLogin, adverts.create);

	app.route('/adverts/:advertId')
		.get(adverts.read)
		.put(users.requiresLogin, adverts.hasAuthorization, adverts.update)
		.delete(users.requiresLogin, adverts.hasAuthorization, adverts.delete);

	// Finish by binding the Advert middleware
	app.param('advertId', adverts.advertByID);
};