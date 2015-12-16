import Ember from 'ember';

export default Ember.Route.extend({
	model() {
		console.log('model');
		return [];
	},
	actions: {
		createUser(newName,newPassword) {

			let appAdapter = this.get('store').adapterFor('application');
			appAdapter.remote.signup(newName, newPassword, function (err, response) {
				console.log('createUser2',err, response);
				if (err) {
					if (err.name === 'conflict') {
						// "batman" already exists, choose another username
					} else if (err.name === 'forbidden') {
						// invalid username
					} else {
						// HTTP error, cosmic rays, etc.
					}
				}
			});
		},
		updateUser(user) {
			user.save();
		},
		deleteUser(user) {
			user.destroyRecord();
		}
	}
});
