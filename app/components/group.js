import React from 'react';
export default ({
  onClick,
  name
}) => (
  <div className='theirDiv'>
      <li onClick={ onClick } >
        {name}
      </li>
  </div>
);
