import { combineReducers } from 'redux'
import {ADD_TODO, COMPLETE_TODO, SET_VISIBILITY_FILTER, VisibilityFilters} from '../actions/actions'
// const ADD_TODO = 'ADD_TODO'
// const COMPLETE_TODO = 'COMPLETE_TODO'
// const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'
// const VisibilityFilters = {
//   SHOW_ALL: 'SHOW_ALL',
//   SHOW_COMPLETED: 'SHOW_COMPLETED',
//   SHOW_ACTIVE: 'SHOW_ACTIVE'
// }
const { SHOW_ALL } = VisibilityFilters

function count(state = 0, action) {

  // if(typeof state === 'undefined'){
  //     console.log('count underfined');
  //     return {
  //       ...state,
  //       count: 0
  //     }
  // }
  switch (action.type) {
    case 'INCREMENT_COUNT':
      return state + 1;
    case 'DECREMENT_COUNT' :
      return state - 1;
    default:
      return state
  }
}

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

function todo(state, action) {
  switch (action.type) {
    case ADD_TODO:
      return {
        id: action.id,
        text: action.text,
        completed: false
      }
    case COMPLETE_TODO:
      if (state.id !== action.id) {
        return state
      }

      return {
        ...state,
        completed: true
      }
    default:
      return state
  }
}
function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        todo(undefined, action)
      ]
    case COMPLETE_TODO:
      return state.map(t =>
        todo(t, action)
      )
    default:
      return state
  }
}

const todoApp = combineReducers({
  count,
  visibilityFilter,
  todos
})

export default todoApp
