import { fetchCategories } from '../utils/api.js'

export const GET_ALL_POSTS = 'GET_ALL_POSTS'
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

export const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  categories
})

export const getCategories = () => dispatch => {
  console.log("actions.getCategories...")
  fetchCategories()
    .then(data => {
      console.log("data:", data)
      console.log("dispatch:", dispatch)
      dispatch(receiveCategories(data.categories))
    })
    .catch(err => console.error(err))
}
