
require('../less/main.less');
'use strict';

import React, { Component, PropTypes } from "react";
import ReactDOM from "react-dom";
import { Block, Flex } from 'jsxstyle';
import Text from "./components/text";
import Counter from "./components/counter";
import Griddle from 'griddle-react';
import { Provider } from 'react-redux';
// import DevTools from './components/DevTools';

import {createStore, applyMiddleware, compose} from "redux";

import todoApp from './containers/todos';

const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INC':
      return state + 1;
    case "DEC" :
      return state- 1;
    default:
      return state;
  }
};

const filter = (state='ALL', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.filter;
    default:
      return state;
  }
}

const rootStore =(state={}, action) => {
  return {
    counter: counter(state, action),
    filter: filter(state.filter,action)
  };
};

// const finalCreateStore = compose(
//   // Middleware you want to use in development:
//   // Required! Enable Redux DevTools with the monitors you chose
//   DevTools.instrument()
//   // Optional. Lets you write ?debug_session=<key> in address bar to persist debug sessions
//   // persistState(getDebugSessionKey())
// )(createStore);

// const store = finalCreateStore(todoApp);
const store = createStore(todoApp);

console.log("Initial State");
console.log(store.getState())

const Fonts = ({ children }) =>
<Block fontFamily='Helvetica, Arial, sans-serif'>
{children}
</Block>;

const Center = ({ children }) =>
  <Flex alignItems='center'
        justifyContent='center'
        flexWrap='wrap'
        >
    {children}
  </Flex>;

const responsibility = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return {
        id : action.id,
        name : action.name,
        desc : action.desc,
      }
    case 'MODIFY_DESC' :
        if (state.id === action.id) {
          return {
            ...state,
            desc : action.desc
        }
      }
      return state;
    default:
      return state;
  }
};

let people = [
      {
        id:1,
        name:"Sam",
        lname:"Iam",
        compentencyId: 1
      },
      {
        id:2,
        name:"Pam",
        lname:"youwho",
        compentencyId: 2
      },
      {
        id:3,
        name:"Jim",
        lname:"Kim",
        compentencyId: 3
      },
      {
        id:4,
        name:"Ken",
        lname:"Gym",
        compentencyId: 2
      }
]
var teams = [
  {
    id:0,
    name:"team 1",
  },
  {
    id:1,
    name:"team 2",
  }
]

class Application extends React.Component {
  render() {
    return (
      <div>
          <Fonts>
          <h1>This</h1>
          <Text value="try"/>
          <Text value="test"/>
          <Center>
          <div>
          <Counter value={store.getState()}
            onInc={() =>
             store.dispatch({
             type: "ADD_TODO",
             id:1,
             text:'new'
           })
          }
          onDe={() =>
           store.dispatch({
             type: "SET_VISIBILITY_FILTER",
             filter:"SHOW_ACTIVE"
           })
          }
          />
          </div>
          <Griddle  results={teams}/>
          <Griddle  results={people}/>
          </Center>
          </Fonts>
      </div>

    );
    console.log(store.getState())
  }
}

const render = () => {
  ReactDOM.render(
    <div>
    <Application />
    </div>
    ,
    document.getElementById("root"));

    console.log(store.getState())
  };

store.subscribe(render);
render();
//
// import showMyDevTools from './showDevTools';
// if (process.env.NODE_ENV !== 'production') {
//   showMyDevTools(store);
// }
