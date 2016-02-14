import React from 'react';
export default ( props ) => (
  <div>
  <ul>
    {props.todos.map( todo =>
      <li key={todo.id}>
        {todo.text}
      </li>
    )}
  </ul>
  </div>
);
