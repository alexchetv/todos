import Ember from 'ember';

export default Ember.Route.extend({
	model() {
	return this.store.filter('user', function(user) {
		return (user.roles.indexOf('_admin') !== -1);
	});
},
renderTemplate(controller, model) {
	this.render('users.index', {
		model: model
	});
}
});
