import { combineReducers } from 'redux'

import CategoryReducer from './categoryReducer'
import PostReducer from './postReducer'
import CommentReducer from './commentReducer'
import SortReducer from './sortReducer'

export default combineReducers({
  categories: CategoryReducer,
  posts: PostReducer,
  comments: CommentReducer,
  sort: SortReducer
})
