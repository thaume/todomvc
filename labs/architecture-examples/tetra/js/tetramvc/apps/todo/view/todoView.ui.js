tetra.view.register('todoView', {
	scope: 'todo', // application name
	use: ['todo'], // list of required controllers

	constr: function(me, app, _) {
		return {
			events: {
				user: {
					'click': {
						// Toggle all completed todo
						'#toggle-all': function(e, elm) {
							_('#todo-list').find('.toggle').trigger('click');
						},

						// Toggle this todo completed attribute
						'#todo-list .toggle': function(e, elm) {
							var container = elm.closest('li');
							container.toggleClass('completed');

							// Update completed count
							_('#clear-completed span').html( _('#todo-list').find('.completed').size() );
						},

						// Delete this todo
						'#todo-list .destroy': function(e, elm) {
							var target = elm.siblings('label').data('id');
							var element = elm.closest('li');
							element.remove();

							// Notify the controller of the deletion
							app.notify('delete todo', { target: target } );

							// Updates counters
							_('#todo-count strong').html( _('#todo-list').find('li').size() );
							_('#clear-completed span').html( _('#todo-list').find('.completed').size() );
							if ( !_('#todo-list').find('li').size() ) { _('#footer').hide(); }
							if ( _('#todo-list').find('li').size() === 1 ) { _('#todo-count span').hide(); } else { _('#todo-count span').show(); }
						},

						// Delete all the 'completed' todos
						'#clear-completed': function(e, elm) {
							_('#todo-list').find('.completed').find('.destroy').trigger('click');
						}
					},

					'dblclick' : {
						// Edit the todo
						'#todo-list label': function(e, elm) {
							elm.hide();
							elm.closest('li').find('.edit').show().select();
						}
					},

					'blur' : {
						// Save the updated todo
						'#todo-list .edit': function(e, elm) {
							var target = elm.siblings('.view').find('label').data('id'),
								value = elm.val();

							if ( !elm.val().trim() ) { 
								elm.siblings('.view').find('.destroy').trigger('click') 
							} else {
								app.notify('update todo', { target: target, value: value });
								elm.hide();
								elm.closest('li').find('label').show();
							}
						}
					},

					'keyup' : {
						// Save updated todo on enter
						'#todo-list .edit' : function (e, elm) {
							var ENTER_KEY = 13;
							if ( e.which === ENTER_KEY ) {
								elm.trigger('blur');
							};
						},

						'#todoapp': function(e, elm) {
							// Updates counters
							_('#todo-count strong').html( _('#todo-list').find('li').size() );
							if ( !_('#todo-list').find('li').size() ) { _('#footer').hide(); } else {_('#footer').show()}
							if ( _('#todo-list').find('li').size() === 1 ) { _('#todo-count span').hide(); } else { _('#todo-count span').show(); }
						}
					}
				},
				
				controller: {
					'todos array': function( data ) {
						_('#todo-list li').remove();
						for ( i in data ) {
							app.exec('display', 'todo', data[i], function(html) {  
								_('#todo-list').prepend(html);
							});
						}

						// Updates counters onload
						_('#todo-count strong').html( _('#todo-list').find('li').size() );
						_('#clear-completed span').html( _('#todo-list').find('.completed').size() );
						if ( !_('#todo-list').find('li').size() ) { _('#footer').hide(); }
						if ( _('#todo-list').find('li').size() === 1 ) { _('#todo-count span').hide(); } else { _('#todo-count span').show(); }

					},
					'todo updated': function ( data ) {
						_('#todo-list').find("[data-id='"+data.target+"']").html(data.value);
					}
				}
			},
			
			methods: {
				init: function() {
					app.notify('read todo', {});
				}
			}
		};
	}
});
