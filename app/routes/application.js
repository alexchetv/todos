import Ember from 'ember';

export default Ember.Route.extend({
	beforeModel: function(posts, transition) {
		let appAdapter = this.store.adapterFor('application');
		var self = this;
		appAdapter.on('ReplicationComplete', function(info) {
			console.log("ReplicationComplete",info.info);
			if (info.info.errors && info.info.errors[0] && info.info.errors[0].status == 401) {
				self.transitionTo('/login');
			}
		});
	},
	actions: {
		error: function(reason, transition) {
			console.log('error',reason, transition);
			//this.transitionTo('/error');
			return false;
		},
		goToRoute: function(routeName) {
			console.log('goToRoute', routeName);
			this.transitionTo(routeName);
		}
	}
});

