import { fetchCategories, fetchPosts } from '../utils/api.js'

// defina action constants
export const GET_ALL_POSTS = 'GET_ALL_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const GET_POST = 'GET_POST'
export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const REMOVE_POST = 'REMOVE_POST'

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'

export const CHANGE_SORT_ORDER = 'CHANGE_SORT_ORDER'

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
    console.log("sortOrder", sortOrder)
    
    if (sortOrder.order === 'desc') {
      posts.sort( (a, b) => b[sortOrder.field] - a[sortOrder.field] )
    } else {
      posts.sort( (a, b) => a[sortOrder.field] - b[sortOrder.field] )
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

export const defineSortOrder = (sortOrder) => (dispatch) => ({
  type: CHANGE_SORT_ORDER,
  sort: sortOrder
})
