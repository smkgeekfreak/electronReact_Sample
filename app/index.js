
require('../less/main.less');
'use strict';
import React, { Component, PropTypes } from "react";
import ReactDOM from "react-dom";
import SplitPane from 'react-split-pane';
import { Block, Flex } from 'jsxstyle';
import Text from "./components/text";
import Counter from "./components/counter";
import TodoList from "./components/todoList";
import GroupList from "./components/groupList";
import AddTodoPres from "./components/addtodo";
import Griddle from 'griddle-react';
import { Provider } from 'react-redux';
// import DevTools from './components/DevTools';
import {addGroup, addTodo, completeTodo, setVisibilityFilter,VisibilityFilters} from './actions/actions'
import VisFilter from "./components/visFilter"

import {createStore, applyMiddleware, compose} from "redux";

import todoApp from './containers/todos';

const store = createStore(todoApp);

console.log("Initial State");
console.log(store.getState())

const FilterLink = ({
  filter,
  childern
}) => {
  return (
    <a href='#'
      onClick={e => {
        e.preventDefault();
        store.dispatch({
          type:SET_VISIBILITY_FILTER,
          filter
        });
      }}
      >
      {children}
      </a>
  );
};
function getFilterTodos(todos,filter) {
  switch(filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos;
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(t=>t.completed);
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(t=>!t.completed);
    default:
      return todos;
    }
  }
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
// const AddTodo = ({
//   onAddClick
// }) => {
//   let input;
//   return (
//     <div>
//     <input ref={ node => {
//       input = node;
//     }} />
//     <button onClick={()=> {
//       onAddClick(input.value)
//       input.value='';
//     }}>
//       Add Todo
//     </button>
//     </div>
//   );
// };

class Application extends React.Component {
  render() {
    const visableTodos = getFilterTodos(store.getState().todos,store.getState().visibilityFilter);
    return (
      <div className="myDiv">
      <SplitPane split="vertical" minSize="75" defaultSize="75">
      <div className="urDiv">
      <h1>This is longer</h1>
      <Text value="try to improve"/>
      <Text value="test and measure"/>
      <Text value={store.getState().count}/>
      <AddTodoPres
        onAddClick={ text=>
          store.dispatch(addTodo(text))
          }
          />
      </div>

      <SplitPane split="horizontal"minSize="50" defaultSize="570">
          <Fonts>
          <div>
          <input id="addText" ref={node=>{
            this.input = node;
          }}/>
          <div>   </div>
          <button onClick = {()=>{
            store.dispatch(addTodo(this.input.value))
            document.getElementById("addText").value= '';
          }}>Add Todo</button>

          <TodoList todos={visableTodos}
              onTodoClick={id => store.dispatch({
                type:"COMPLETE_TODO",
                id
              })}
          />
          </div>
          <div>
          <input id="addGroup" ref={node=>{
            this.groupName= node;
          }}/>
          <button onClick = {()=>{
            store.dispatch(addGroup(document.getElementById("addGroup").value))
            document.getElementById("addGroup").value= '';
          }}>Add Group</button>

          <GroupList groups={store.getState().groups}
            onGroupClick={id => store.dispatch({
              type:"REMOVE_GROUP",
              id
            })}
          />
          </div>
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
              store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_ALL))
          }
          onShowActive={() =>
           store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_ACTIVE))
          }
          onShowCompleted={() =>
           store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED))
          }
          />
          <Griddle  results={teams}/>
          <Griddle  results={people}/>
          </Center>
          </Fonts>
          <div></div>
      <div></div>
      </SplitPane>
      </SplitPane>

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
store.dispatch(addGroup("2nd Group"))
// store.dispatch(addGroup("combinded todo"))

// import showMyDevTools from './showDevTools';
// if (process.env.NODE_ENV !== 'production') {
//   showMyDevTools(store);
// }
