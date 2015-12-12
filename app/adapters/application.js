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
remote.setMaxListeners(20);

export default Adapter.extend({
	db: db,
	remote: remote
});
