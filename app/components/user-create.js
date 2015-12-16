import Ember from 'ember';

export default Ember.Component.extend({
	store: Ember.inject.service(),
  actions: {
    createUser() {
	    console.log('createUser1',this.getProperties('newname', 'newpassword'));
	    const { newname, newpassword, isAdmin } = this.getProperties('newname', 'newpassword','isAdmin');
	    console.log('createUser1',newname,newpassword);
	    var self = this;
	    if (login && password) {
				var roles = isAdmin ? {roles:["admin"]} : {roles:[]};
		    let appAdapter = this.get('store').adapterFor('application');
	      appAdapter.remote.signup(newname, newpassword, roles, function (err, response) {
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
		    this.set('newname', '');
		    this.set('newpassword', '');
		    this.set('isAdmin', false);
		  }

		}

	}
});
