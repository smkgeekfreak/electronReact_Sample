import React from 'react';
export default ( props ) => (
  <div>
  <ul>
    {props.todos.map( todo =>
      <li key={todo.id}
        onClick={()=> {
          props.store.dispatch({
            type:"COMPLETE_TODO",
            id:todo.id
          })
        }}
        style={{
          textDecoration:
            todo.completed ?
                'line-through' : 'none'
        }} >
        {todo.text}
      </li>
    )}
  </ul>
  </div>
);
