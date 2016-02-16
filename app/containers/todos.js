import { combineReducers } from 'redux'
import {
  ADD_TODO, COMPLETE_TODO,
  SET_VISIBILITY_FILTER, VisibilityFilters,
  ADD_GROUP, RENAME_GROUP, REMOVE_GROUP
} from '../actions/actions'
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

function group(state, action ) {
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

function groups(state = [], action) {
  switch (action.type) {
    case ADD_GROUP:
      return [
        ...state,
        group({
          id:state.reduce((maxId, todo) => Math.max(group.id, maxId), -1) + 1
        }, action)
      ]
    case RENAME_GROUP:
      return state.map(g =>
        group(g, action)
      )
    default:
      return state
  }
}

function todo(state, action) {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        text: action.text,
        completed: false
      }
    case COMPLETE_TODO:
      if (state.id !== action.id) {
        return state
      }

      return {
        ...state,
        completed:!state.completed
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
        todo({
          id:state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1
        }, action)
      ]
    case COMPLETE_TODO:
      return state.map(t =>
        todo(t, action)
      )
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

const todoApp = combineReducers({
  count,
  visibilityFilter,
  todos,
  groups
})

export default todoApp
