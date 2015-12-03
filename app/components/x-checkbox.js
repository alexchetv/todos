import Ember from 'ember';

export default Ember.Checkbox.extend({
	change(){
		this.sendAction('action');
	}
});
