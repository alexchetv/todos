import Ember from 'ember';

export default Ember.Route.extend({
	beforeModel:function(transition) {
		self = this;
		let appAdapter = this.get('store').adapterFor('application');
		appAdapter.remote.logout()
			.then(function (info) {
				console.log('logout',info);
			}).catch(function (err) {
				console.log('logout error', err);
			});
	},
	setupController: function(controller, model) {
		this._super(controller, model);
		this.controllerFor('application').setProperties({'currentUser': null,"currentPageTitle": "please log in","currentPageFooter":	""});
	},
});
