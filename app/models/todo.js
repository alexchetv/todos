import DS from 'ember-data';
import { Model } from 'ember-pouch';

export default Model.extend({
	title: DS.attr('string'),
	completed: DS.attr('boolean'),
	author: DS.attr('string')
});
