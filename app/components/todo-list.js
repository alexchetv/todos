import Ember from 'ember';

export default Ember.Component.extend({
	remainingCount: Ember.computed('todos.@each.completed', function() {
		let todos = this.get('todos');
		return todos.filterBy('completed', false).get('length');
	}),
	inflection: Ember.computed('remaining', function() {
		var remaining = this.get('remaining');
		return (remaining === 1) ? 'item' : 'items';
	}),
	completedCount: Ember.computed('todos.@each.completed', function() {
		var todos = this.get('todos');
		return todos.filterBy('completed', true).get('length');
	}),
	hasCompleted: Ember.computed('completedCount', function() {
		return this.get('completedCount') > 0;
	}),
	/*didInsertElement() {
	let todos = this.get('todos');
	if (todos.get('length') > 0 && todos.isEvery('completed', true)) {
		this.set('allAreDone', true);
	} else {
		this.set('allAreDone', false);
	}
},
allAreDoneObserver: Ember.observer('allAreDone', function() {
	let completeValue = this.get('allAreDone');
	let todos = this.get('todos');
	todos.forEach((todo) => {
		todo.set('completed', completeValue)
	this.sendAction('updateTodo', todo);
});
}),*/
	allAreDone:Ember.computed('todos.@each.completed', {
		get(key) {
			let todos = this.get('todos');
			return (todos.get('length') > 0 && todos.isEvery('completed', true));
		},
		set(key, value) {
			let todos = this.get('todos');
			todos.forEach((todo) => {
				todo.set('completed', value)
				this.sendAction('updateTodo', todo);
			})
			return value;
		}
	}),
	actions: {
		clearCompleted() {
	let completed = this.get('todos').filterBy('completed', true);
	completed.forEach((todo) => {
		this.sendAction('deleteTodo', todo);
});
}
}
});

