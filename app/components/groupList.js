import React from 'react';
export default ( props, onGroupClick ) => (
  <div className='urDiv'>
  <ul>
    {props.groups.map( group =>
      <li key={group.id}
        onClick={() => props.onGroupClick(group.id)}
      >
        {group.name}
      </li>
    )}
  </ul>
  </div>
);
