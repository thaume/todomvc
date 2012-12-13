tetra.model.register('todo', {
	scope: 'todo',
	store: true,

	req : {
		save: {
			url:{},
			uriParams:{}
		}
	},
	
	attr : {
		html : '',
		url : ''
	},
	
	methods : function(attr, data) {

		return {
			validate : function(attr, errors){
				return errors;
			},
			getAttr : function(){
				return attr;
			},
				
			//Model mock up methods
			putTodo: function ( data, app ) {
				var todos = JSON.parse( localStorage.getItem('todo-tetra') || '[]' ), 
					todo = {};

				todo = {
					id: Date.now(),
					value: data.value
				},
				todos.push( todo );
				localStorage.setItem( 'todo-tetra', JSON.stringify( todos ) );
				app.notify('todo created', todo );
			},//*/

			getTodo: function ( data ) {
				if ( !data ) {
					return JSON.parse( localStorage.getItem('todo-tetra') || '[]' );
				} else {
					var todos = JSON.parse( localStorage.getItem('todo-tetra') || '[]' ),
						index;
					// Loop through todos' array
					for ( var i = 0; i < todos.length; i++ ) {
						if ( todos[i].id === data.target ) {
							index = i;
						}
					}
					return { index: index, todos: todos }
				}
			},

			updateTodo: function ( data, app ) {
				var sortedData = this.getTodo( data );
				sortedData.todos[sortedData.index].value = data.value;
				localStorage.setItem( 'todo-tetra', JSON.stringify( sortedData.todos ) );
				app.notify('todo updated', data);
			},

			deleteTodo: function ( data ) {
				var sortedData = this.getTodo( data );
				sortedData.todos.splice( sortedData.index, 1);
				localStorage.setItem( 'todo-tetra', JSON.stringify( sortedData.todos ) );
			}//*/
		};
	}
});
