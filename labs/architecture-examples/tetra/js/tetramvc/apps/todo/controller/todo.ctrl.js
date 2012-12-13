tetra.controller.register('todo', {
	scope: 'todo', // application name
	use: ['todo'], // list of required models
	
	constr: function(me, app, page, orm) {
		return {
			events: {
				model: { // events received from model
					'todo' : {
						create: function (obj) {
						}
					}
				},
				
				view: { // events received from view
					'create todo': function( data ) {
						orm('todo').create().putTodo(data, app);
					},
					'read todo' : function ( data ) {
						var todos = orm('todo').create().getTodo();
						app.notify('todos array', todos );
					},
					'update todo' : function( data ) {
						orm('todo').create().updateTodo(data, app);
					},
					'delete todo' : function( data ) {
						orm('todo').create().deleteTodo(data, app);
					}
				}
			},

			methods: {
				init: function() {
					//console.log("Controller start");
				}
			}
		};
	}
});
