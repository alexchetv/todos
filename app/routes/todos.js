import Ember from 'ember';

export default Ember.Route.extend({
	model() {
	return this.store.findAll('todo');
},
actions: {
	createTodo(newTitle) {
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
