import Ember from 'ember';

export default Ember.Component.extend({
	synch: false,
	stopspin:false,
	store: Ember.inject.service(),
	init: function() {
		this._super(...arguments);
		console.log('replicatingOninit');
		let appAdapter = this.get('store').adapterFor('application');
		appAdapter.on('ReplicationActive', function() {
			console.log('replicatingOn',this.synch);
			if (this.get('synch')) return;
			this.set('synch',true);
			this.set('stopspin',false);
			var timerId = setInterval(function() {
				if (this.stopspin) {
					this.set('synch',false);
					this.set('stopspin',false);
					clearInterval(timerId);
				}
			}.bind(this), 1000);
		}.bind(this));
		appAdapter.on('ReplicationPaused',function() {
			console.log('replicatingOff',this.synch);
			this.set('stopspin',true);
		}.bind(this));
	},
	willDestroy:function() {
		let appAdapter = this.get('store').adapterFor('application');
		appAdapter.off('ReplicationActive');
		appAdapter.off('ReplicationPaused');
		this._super(...arguments);
	},
});

