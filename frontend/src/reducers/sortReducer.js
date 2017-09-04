import {
  CHANGE_SORT_ORDER
} from '../actions'

const defaultSortOrder = {
  field: 'voteScore',
  order: 'desc'
};

export default (state = defaultSortOrder, action) => {
  switch (action.type) {
    case CHANGE_SORT_ORDER:
      return {
        field: action.sort.field,
        order: action.sort.order
      }
    default:
      return state
  }
}
