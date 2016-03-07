import { combineReducers } from 'redux'
import {
  ADD_TODO, COMPLETE_TODO,
  SET_VISIBILITY_FILTER, VisibilityFilters
} from '../actions/actions'
import { group, groups} from './groups'
import  Counter from './counter'
const { SHOW_ALL } = VisibilityFilters

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

let todoApp = combineReducers({
  Counter,
  visibilityFilter,
  todos,
  groups
})

export default todoApp
