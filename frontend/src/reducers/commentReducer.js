import { RECEIVE_COMMENTS } from '../actions'

export default (initialState = {}, action) => {
  switch (action.type) {
    case RECEIVE_COMMENTS:
      let newState = initialState
      if (action.comments.length > 0) {
        const key = action.comments[0].parentId
        newState[key] = action.comments
      } else {
        newState[action.postId] = []
      }
      return newState

    default:
      return initialState
  }
}
