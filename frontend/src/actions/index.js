import {
  fetchCategories,
  fetchPosts,
  increasePostScoreAPI,
  decreasePostScoreAPI
} from '../utils/api.js'

// define action constants
export const GET_ALL_POSTS = 'GET_ALL_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const GET_POST = 'GET_POST'
export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const REMOVE_POST = 'REMOVE_POST'

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'

export const CHANGE_SORT_ORDER = 'CHANGE_SORT_ORDER'
export const DESCENDING_ORDER = 'desc'
export const ASCENDING_ORDER = 'asc'

export const INCREASE_POST_SCORE = 'INCREASE_POST_SCORE'
export const DECREASE_POST_SCORE = 'DECREASE_POST_SCORE'

export const INCREASE_COMMENT_SCORE = 'INCREASE_COMMENT_SCORE'
export const DECREASE_COMMENT_SCORE = 'DECREASE_COMMENT_SCORE'

// define action creators
export const addPost = (post) => ({
  type: ADD_POST,
  post
})

const receivePosts = (posts) => ({
  type: RECEIVE_POSTS,
  posts
})

export const getPosts = (sortOrder) => async (dispatch) => {
  try {
    const posts = await fetchPosts()
    if (sortOrder.order === ASCENDING_ORDER) {
      posts.sort( (a, b) => a[sortOrder.field] - b[sortOrder.field] )
    } else {
      posts.sort( (a, b) => b[sortOrder.field] - a[sortOrder.field] )
    }
    dispatch(receivePosts(posts))
  } catch(err) {
    console.error("Error getting posts", err)
  }
}

const receiveCategories = (categories) => ({
  type: RECEIVE_CATEGORIES,
  categories
})

export const getCategories = () => (dispatch) => {
  fetchCategories()
  .then(data => {
    dispatch(receiveCategories(data.categories))
  })
  .catch(err => console.error(err))
}

// action creator for a synchronous action (change sort order)
export const changeSortOrder = (sortOrder) => ({
  type: CHANGE_SORT_ORDER,
  sort: sortOrder
})

export const increasePostScore = (id) => async(dispatch) => {
  try {
    const result = await increasePostScoreAPI(id)
    dispatch({
      type: INCREASE_POST_SCORE,
      id
    })
  }
  catch(err) {
    console.error("Error increasing post voteScore", err)
  }
}

export const decreasePostScore = (id) => async(dispatch) => {
  try {
    const result = await decreasePostScoreAPI(id)
    dispatch({
      type: DECREASE_POST_SCORE,
      id
    })
  }
  catch(err) {
    console.error("Error decreasing post voteScore", err)
  }
}
