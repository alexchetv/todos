import config from '../config/environment';
import PouchDB from 'pouchdb';
import { Adapter } from 'ember-pouch';

var db = new PouchDB(config.local_couch || 'todos');
var remote = new PouchDB(config.remote_couch, {ajax: {timeout: 20000}});

db.sync(remote, {live: true, retry: true});

export default Adapter.extend({
	db: db,

	// Ember Data 2.0 Reload behavior
	shouldReloadRecord: function() { return true; },
	shouldReloadAll: function() { return true; },
	shouldBackgroundReloadRecord: function() { return false; },
	shouldBackgroundReloadAll: function() { return false; },

	// Change watcher for ember-data
	LoadChangedUnloadDeletedRecord: function() {
		this.db.changes({
			since: 'now',
			live: true,
			returnDocs: false
		}).on('change', function (change) {
			//console.log('change',change);
			var obj = this.db.rel.parseDocID(change.id);
			// skip changes for non-relational_pouch docs. E.g., design docs.
			if (!obj.type || obj.type === '') { return; }

			//var appController = this.container.lookup("controller:application");
			//appController.send('kickSpin');
			if (change.deleted) {
				var record = this.store.peekRecord(obj.type,obj.id);
				if (record && !record.get("isDeleted")) {
					console.log('record',record);
					record.unloadRecord();
				}
			} else {
				this.store.findRecord(obj.type,obj.id);
			}
		}.bind(this));
	}.on('init')
});
