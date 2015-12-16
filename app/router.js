import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('todos', { path: '/' }, function() {
    this.route('completed');
    this.route('incompleted');
  });
  this.route('login');
  this.route('users', function() {
	  this.route('masters');
	  this.route('slaves');
  });
});

export default Router;
