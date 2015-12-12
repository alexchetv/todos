import Ember from 'ember';

export default Ember.Component.extend({

	store: Ember.inject.service(),
	actions: {
		authenticate() {
			self = this;
			const { login, password } = this.getProperties('login', 'password');
			let appAdapter = this.get('store').adapterFor('application');
			appAdapter.remote.login(login, password)
				.then(function (info) {
					console.log('login',info);
					self.sendAction('goToRoute', 'todos');
				}).catch(function (err) {
					console.log('login error', err);
				});
		}
	}

});