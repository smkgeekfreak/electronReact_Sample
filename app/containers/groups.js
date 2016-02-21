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
    default:
      return state
  }
}
