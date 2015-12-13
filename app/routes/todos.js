import Ember from 'ember';

export default Ember.Route.extend({
	currentUser: {},
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
				self.set("currentUser",{name: response.userCtx.name});
				console.log("user",response.userCtx.name);
			}
		});
	},
	model() {
		console.log('model');
		return this.store.findAll('todo');
	},
	setupController: function(controller, model) {
		this._super(controller, model);
		this.controllerFor('application').setProperties({'currentUser': this.currentUser,"currentPageTitle": "todos","currentPageFooter":	"Double-click to edit a todo"});
	},
	afterModel: function(posts, transition) {
		let appAdapter = this.store.adapterFor('application');
		var self = this;
		appAdapter.on('ReplicationComplete', function(info) {
			console.log("ReplicationComplete",info);
			if (info && info.errors[0] && info.errors[0].status == 401) {
				self.transitionTo('/login');
			}
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
