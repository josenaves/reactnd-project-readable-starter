import { combineReducers } from 'redux'

import {
  RECEIVE_CATEGORIES
} from '../actions'

// here we define the intial state for the app
const initialState = {
  posts: [],
  comments: [],
  categories: [
    {name: 'blog', path: 'blog'},
    {name: 'video', path: 'video'},
    {name: 'drops', path: 'drops'}]
}

const categoryReducer = (state = initialState, action) => {
  console.log("state:", state)
  console.log("action:", action)
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      const { categories } = action
      return [...categories]
    default:
      return []
  }
}

const PostReducer = (state = initialState, action) => {
  console.log("state:", state)
  console.log("action:", action)

  switch (action.type) {
    default:
      return []
  }
}

const ComentReducer = (state = initialState, action) => {
  console.log("state:", state)
  console.log("action:", action)

  switch (action.type) {
    default:
      return []
  }
}

export default combineReducers({
  categories: categoryReducer,
  posts: PostReducer,
  comments: ComentReducer
})

//export default categoryReducer
