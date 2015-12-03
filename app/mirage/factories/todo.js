import Mirage, {faker} from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  title(i) { return `Todo title ${i + 1}`; },
completed: faker.list.random(true, false)
});
