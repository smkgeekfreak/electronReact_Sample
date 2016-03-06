import {
  ADD_GROUP, RENAME_GROUP, REMOVE_GROUP
} from '../actions/actions'

export function group(state, action ) {
  switch (action.type) {
    case ADD_GROUP:
      return {
        ...state,
        name: action.name,
        status: 'ACTIVE'
      }
    case RENAME_GROUP:
      if(state.id !== action.id) {
        return state;
      }
      return {
        ...state,
        name: action.name
      }
  }
}

export function groups(state = [], action) {
  // console.log('action =' + action.id);
  switch (action.type) {
    case ADD_GROUP:
      return [
        ...state,
        group({
          id:state.reduce((maxId, group) => Math.max(group.id, maxId), -1) + 1
        }, action)
      ]
    case RENAME_GROUP:
      return state.map(g =>
        group(g, action)
      )
    case REMOVE_GROUP:
      // console.log('state =' + JSON.stringify(state));
      // let index = findIndexById(state,  action.id)
      let index = state.map(function(e) { return e.id; }).indexOf(action.id);
      // console.log('index =' + index);
      if(typeof index !== 'undefined') // where not undefined or id=0 which is also falsy
        return [
          ...state.slice(0, index),
          ...state.slice(index + 1)
        ]
      return state;
    default:
      return state
  }
}

// function findIndexById(state=[], value) {
//   // console.log("found =" + value)
//     for (var i = 0, len = state.length; i < len; i++) {
//       // console.log("val = " + JSON.stringify(state[i]))
//       if (state[i].id == value) {
//         return i;
//       }
//     }
// }
