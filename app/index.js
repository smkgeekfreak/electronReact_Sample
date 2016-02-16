
require('../less/main.less');
'use strict';
import React, { Component, PropTypes } from "react";
import ReactDOM from "react-dom";

import { Block, Flex } from 'jsxstyle';
import Text from "./components/text";
import Counter from "./components/counter";
import TodoList from "./components/todoList";
import Griddle from 'griddle-react';
import { Provider } from 'react-redux';
// import DevTools from './components/DevTools';
import {addGroup, addTodo, completeTodo, setVisibilityFilter} from './actions/actions'
import VisFilter from "./components/visFilter"

import {createStore, applyMiddleware, compose} from "redux";

import todoApp from './containers/todos';

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
          <div>
          <input id="addText" ref={node=>{
            this.input = node;
          }}/>
          <div>   </div>
          <button onClick = {()=>{
            store.dispatch(addTodo(this.input.value))
            document.getElementById("addText").value= '';
          }}>Add</button>

          <TodoList todos={store.getState().todos} store={store} />
          </div>
          <h1>This</h1>
          <Text value="try"/>
          <Text value="test"/>
          <Text value={store.getState().count}/>
          <Center>
          <div>
          <Counter value={store.getState()}
            onInc={() =>
             store.dispatch({
             type: "INCREMENT_COUNT",
           })
          }
          onDe={() =>
           store.dispatch({
             type: "DECREMENT_COUNT"
           })
          }
          />
          </div>
          <VisFilter
            onShowAll={() =>
              store.dispatch(setVisibilityFilter("SHOW_ALL"))
          }
          onShowActive={() =>
           store.dispatch(setVisibilityFilter("SHOW_ACTIVE"))
          }
          />
          <Griddle  results={teams}/>
          <Griddle  results={people}/>
          </Center>
          </Fonts>
      </div>

    );
    // console.log(store.getState())
    // store.dispatch(addTodo("combinded todo"))
    // console.log(store.getState())
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
store.dispatch(addTodo("combinded todo"))
store.dispatch(addTodo("second todo"))
store.dispatch(addGroup("My Group"))
// store.dispatch(addGroup("combinded todo"))

// import showMyDevTools from './showDevTools';
// if (process.env.NODE_ENV !== 'production') {
//   showMyDevTools(store);
// }
