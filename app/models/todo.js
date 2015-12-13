import DS from 'ember-data';
import { Model } from 'ember-pouch';

export default Model.extend({
	title: DS.attr('string'),
	completed: DS.attr('boolean'),
	createdBy: DS.attr('string')
});
