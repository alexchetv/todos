import config from '../config/environment';
import PouchDB from 'pouchdb';
import { Adapter } from 'ember-pouch';
//PouchDB.debug.enable('*');
PouchDB.debug.disable();


var db = new PouchDB(config.local_couch || 'todos');
db.setMaxListeners(20);
var remote = new PouchDB(config.remote_couch, {
	skipSetup: true,
	ajax: {timeout: 20000}
});

export default Adapter.extend({
	db: db,

	// Ember Data 2.0 Reload behavior
	shouldReloadRecord: function() { return true; },
	shouldReloadAll: function() { return true; },
	shouldBackgroundReloadRecord: function() { return false; },
	shouldBackgroundReloadAll: function() { return false; },

	// Change watcher for ember-data
	LoadChangedUnloadDeletedRecord: function() {
		this.db.replicate.to(remote, {live: true, retry: true});
		this.db.replicate.from(remote, {live: true, retry: true})
			.on('change', function (change) {
				console.log('docs',change.docs);
				var self = this;
				change.docs.forEach(function (doc) {
					console.log('doc',doc);

					var obj = self.db.rel.parseDocID(doc._id);

					console.log('obj',obj);
					// skip changes for non-relational_pouch docs. E.g., design docs.
					if (!obj.type || obj.type === '') { return; }

					//var appController = this.container.lookup("controller:application");
					//appController.send('kickSpin');
					if (doc._deleted) {
						var record = self.store.peekRecord(obj.type,obj.id);
						if (record && !record.get("isDeleted")) {
							record.unloadRecord();
						}
					} else {
						console.log('findTodo');
						self.store.findRecord(obj.type,obj.id);
					}
				});

			}.bind(this));
	}.on('init')
});
