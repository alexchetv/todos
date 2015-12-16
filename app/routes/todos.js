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
				console.log("user",response.userCtx);
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
		appAdapter.startReplication();
	},
	deactivate: function() {
		let appAdapter = this.get('store').adapterFor('application');
		appAdapter.stopReplication();
	},
actions: {
	createTodo(newTitle) {
		console.log('createTodo');
		var author = this.controllerFor('application').get('currentUser').name;
		this.store.createRecord('todo', {
			createdBy: author,
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
