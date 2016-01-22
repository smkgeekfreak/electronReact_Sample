
require('../less/main.less');
'use strict';

import React, { Component, PropTypes } from "react";
import ReactDOM from "react-dom";
import { Block, Flex } from 'jsxstyle';
import Text from "./components/text";
import Counter from "./components/counter";

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

class Application extends React.Component {
  render() {
    return (
      <div>
          <Fonts>
          <h1>This</h1>
          <Text value="try"/>
          <Text value="test"/>
          <Center>
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
