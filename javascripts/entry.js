require('../less/main.less');
'use strict';

import React from "react";
import ReactDOM from "react-dom";
import {createStore} from "redux";

const counter = (state=7, action) => {
  switch (action.type) {
    case 'INC':
      return state + 1;
    case "DEC" :
      return state - 1;
    default:
      return state;
  }
}

const todos = (state =[], action ) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id : action.id,
          text : action.text
        }
      ]
    default:
      return state;
  }
}

// const { createStore } = Redux;
const store = createStore(counter);
const Counter = ({
  value,
  onInc,
  onDe
}) => (
  // <h1>{value}</h1>
  <div className="myDiv">Hello Electron app that i just changed from ReactDOM with {value}!
  Using Electon 
  <button onClick={onInc}>Up</button>
  <button onClick={onDe}>Down</button>
  </div>
);

const render = () => {
ReactDOM.render(
  <Counter value={store.getState()}
  onInc={() =>
    store.dispatch({
      type: "INC"
    })
  }
  onDe={() =>
    store.dispatch({
      type: "DEC"
    })
  }
  />,
  document.getElementById('root'));
};
store.subscribe(render);
render();
