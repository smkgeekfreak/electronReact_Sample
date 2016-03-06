import React from 'react';
import Todo from './todo'
export default ( props, onTodoClick ) => (
  <div className='theirDiv'>
  <ul>
    {props.todos.map( todo =>
      <Todo
        key={todo.id}
        {...todo}
        onClick={() => props.onTodoClick(todo.id)}
      />
    )}
  </ul>
  </div>
);
