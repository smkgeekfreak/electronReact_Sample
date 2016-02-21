import React from 'react';
export default ( props ) => (
  <div className='urDiv'>
  <ul>
    {props.groups.map( group =>
      <li key={group.id}>
        {group.name}
      </li>
    )}
  </ul>
  </div>
);
