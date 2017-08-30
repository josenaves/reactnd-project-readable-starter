import { combineReducers } from 'redux'

import {
  RECEIVE_CATEGORIES,
  RECEIVE_POSTS
} from '../actions'

// TODO understand why we don't need this
// // here we define the intial state for the app
// const initialState = {
//   posts: [],
//   comments: [],
//   categories: []
// }

const CategoryReducer = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      return [ ...state, ...action.categories ]
    default:
      return state
  }
}

/*
$ curl --header "Authorization: xcx"  http://localhost:5001/posts
[ { "id":"8xf0y6ziyjabvozdd253nd",
    "timestamp":1467166872634,
    "title":"Udacity is the best place to learn React",
    "body":"Everyone says so after all.",
    "author":"thingtwo",
    "category":"react",
    "voteScore":6,
    "deleted":false
  },
  {
    "id":"6ni6ok3ym7mf1p33lnez",
    "timestamp":1468479767190,
    "title":"Learn Redux in 10 minutes!",
    "body":"Just kidding. It takes more than 10 minutes to learn technology.",
    "author":"thingone",
    "category":"redux",
    "voteScore":-5,
    "deleted":false
  } ]
*/
const PostReducer = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_POSTS:
      return [...state, ...action.posts]
    default:
      return state
  }
}

const ComentReducer = (state = [], action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default combineReducers({
  categories: CategoryReducer,
  posts: PostReducer,
  comments: ComentReducer
})
