
require('../less/main.less');
'use strict';

import React, { Component, PropTypes } from "react";
import ReactDOM from "react-dom";
import { Block, Flex } from 'jsxstyle';
import Text from "./components/text";
import Counter from "./components/counter";
import Griddle from 'griddle-react';

import {createStore} from "redux";

const counter = (state=2, action) => {
  switch (action.type) {
    case 'INC':
      return state + 1;
    case "DEC" :
      return state - 1;
    default:
      return state;
  }
};

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

// const responsibility = (state, action) => {
//   switch (action.type) {
//     case 'ADD':
//       return {
//         id : action.id,
//         name : action.name,
//         desc : action.desc,
//       }
//     case 'MODIFY_DESC' :
//         // if (state.id === action.id) {
//           return {
//             ...state, {
//             desc : action.desc
//           }
//         }
//         // return state;
//     default:
//       return state;
//   }
// }
const store = createStore(counter);
var teams = [
  {
    id:0,
    name:"team 1",
    members: [
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
      }
    ]
  },
  {
    id:1,
    name:"team 2",
    members : [
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
  }
]
var fakeData =  [
{
  "January": 35,
  "February": 20,
  "March": 27,
  "April": 32,
  "May": 23,
  "June": 42
},
{
  "January": 35,
  "February": 20,
  "March": 27,
  "April": 32,
  "May": 23,
  "June": 42
},
{
  "January": 35,
  "February": 20,
  "March": 27,
  "April": 32,
  "May": 23,
  "June": 42
}
];

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
             type: "INC"
           })
          }
          onDe={() =>
           store.dispatch({
             type: "DEC"
           })
          }
          />
          </div>
          <Griddle childrenColumnName="members" results={teams}/>
          </Center>
          </Fonts>

      </div>
    );
  }
}

const render = () => {
  ReactDOM.render(<Application />,
    document.getElementById("root"));
  };

store.subscribe(render);
render();
