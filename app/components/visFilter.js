import React from 'react';
export default ({ onShowAll,onShowActive }) => (
  <div>
  <button onClick={onShowAll}>All</button>
  <button onClick={onShowActive}>Active</button>
  </div>
);
