import { fetchCategories, fetchPosts } from '../utils/api.js'

export const GET_ALL_POSTS = 'GET_ALL_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const GET_POST = 'GET_POST'
export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const REMOVE_POST = 'REMOVE_POST'

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'

export const addPost = (post) => ({
  type: ADD_POST,
  post
})

const receivePosts = (posts) => ({
  type: RECEIVE_POSTS,
  posts
})

export const getPosts = (sortBy) => async (dispatch) => {
  try {
    const posts = await fetchPosts()

    console.log("Will sort by", sortBy)
    console.log("(before) posts: ", posts)

    posts.sort( (a, b) => b[sortBy] - a[sortBy] )
    
    console.log("(after) posts: ", posts)
    
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
