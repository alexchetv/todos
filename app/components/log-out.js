import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['user-info'],
	store: Ember.inject.service(),
	actions: {
		logout() {
			self = this;
			let appAdapter = this.get('store').adapterFor('application');
			appAdapter.remote.logout()
				.then(function (info) {
					console.log('logout',info);
					self.sendAction('goToRoute', 'login');
				}).catch(function (err) {
					console.log('logout error', err);
				});
		}
	}

});