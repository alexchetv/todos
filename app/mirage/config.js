import Mirage from 'ember-cli-mirage';
export default function() {
  this.get('/todos', function(db, request) {
    return {
      data: db.todos.map(attrs => (
      {type: 'todos', id: attrs.id, attributes: attrs }
      ))
	  };
	});
	this.post('/todos', function(db, request) {
	  let attrs = JSON.parse(request.requestBody);
	  let todo = db.todos.insert(attrs);
	  return {
	    data: {
	      type: 'todos',
	      id: todo.id,
	      attributes: todo
	    }
	  };
	});
	this.patch('/todos/:id', function(db, request) {
	  let attrs = JSON.parse(request.requestBody);
	  let todo = db.todos.update(attrs.data.id, attrs.data.attributes);
	  return {
	    data: {
	      type: "todos",
	      id: todo.id,
	      attributes: todo
	    }
	  };
	});
this.del('/todos/:id');
	this.del('/todos/:id', function(db, request) {
		let id = request.params.id;
		db.todos.remove(id);
		return new Mirage.Response(204, {}, {});
	});
}
