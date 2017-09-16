import {
  SET_CATEGORY_FILTER
} from '../actions'

export default (state = "", action) => {
  switch (action.type) {
    case SET_CATEGORY_FILTER:
      return action.filter

    default:
      return state
  }
}
