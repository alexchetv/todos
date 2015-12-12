import Ember from 'ember';

export default Ember.Route.extend({
	beforeModel: function(transition) {
		let appAdapter = this.store.adapterFor('application');
		var self = this;
		return appAdapter.get('remote').getSession(function (err, response) {
			if (err) {
				// network error
				self.transitionTo('/login');
			} else if (!response.userCtx.name) {
				console.log("no user");
				self.transitionTo('/login');
			} else {
				// response.userCtx.name is the current user
				console.log("user",response.userCtx);
			}
		});
	},
	model() {
		console.log('model');
		return this.store.findAll('todo');
	},
	afterModel: function(posts, transition) {
		let appAdapter = this.store.adapterFor('application');
		var self = this;
		appAdapter.on('ReplicationComplete', function(obj) {
			console.log("ReplicationComplete",obj);
			self.transitionTo('/login');
		});
		appAdapter.startReplication();
	},
	deactivate: function() {
		let appAdapter = this.get('store').adapterFor('application');
		appAdapter.stopReplication();
	},
actions: {
	createTodo(newTitle) {
		console.log('createTodo');
		this.store.createRecord('todo', {

			title: newTitle,
			completed: false
		}).save();
	},
	updateTodo(todo) {
		todo.save();
	},
	deleteTodo(todo) {
		todo.destroyRecord();
	}
}
});
