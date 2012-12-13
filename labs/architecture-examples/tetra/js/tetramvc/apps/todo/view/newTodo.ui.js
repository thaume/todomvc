tetra.view.register('newTodo', {
	scope: 'todo', // application name
	use: ['todo'], // list of required controllers

	constr: function(me, app, _) {
		return {
			events: {
				user: {
					'keyup': {
						'#new-todo': function(e, elm) {
							// Save on enter
							var ENTER_KEY = 13;
							var trimedStr = elm.val().trim();
							if ( e.which === ENTER_KEY && ( trimedStr ) ) {
								app.notify('create todo', { value: elm.val() });
								elm.val('');
							};
						}
					}
				},
				
				controller: {
					// Retrives the todo data
					'todo created': function( data ) {
						app.exec('display', 'todo', data, function(html) {  
							_('#todo-list').prepend(html);
						});
					}
				}
			},
			
			methods: {
				init: function() {}
			}
		};
	}
});
