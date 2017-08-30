import { fetchCategories, fetchPosts } from '../utils/api.js'

export const GET_ALL_POSTS = 'GET_ALL_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const GET_POST = 'GET_POST'
export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const REMOVE_POST = 'REMOVE_POST'

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'

export function addPost(post) {
  return {
    type: ADD_POST,
    post
  }
}

export const receivePosts = (posts) => ({
  type: RECEIVE_POSTS,
  posts
})

export const getPosts = () => (dispatch) => {
  fetchPosts()
    .then(data => {
      dispatch(receivePosts(data))
    })
    .catch(err => console.error(err))
}

export const receiveCategories = (categories) => ({
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
