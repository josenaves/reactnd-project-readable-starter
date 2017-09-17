const getAuthHeaders = () => {
  const headers = new Headers();
  headers.append('Authorization', 'xcx')
  headers.append('Content-Type', 'application/json')
  return headers
};

export const fetchCategories = () => {
  const options = { method: 'get', headers: getAuthHeaders() }

  return fetch('http://localhost:5001/categories', options)
    .then(
      res => res.json()
    )
    .catch(err => console.error(err))
}

export const fetchPosts = () => {
  const options = { method: 'get', headers: getAuthHeaders() }

  return fetch('http://localhost:5001/posts', options)
    .then(
      res => {
        return res.json()
      }
    )
    .catch(err => console.error(err))
}

export const increasePostScoreAPI = (postId) => {
  const options = {
    method: 'post',
    headers: getAuthHeaders(),
    body: JSON.stringify({
      option: 'upVote'
    })
  }
  
  return fetch(`http://localhost:5001/posts/${postId}`, options)
  .then(
    res => {
      return res.json()
    }
  )
  .catch(err => console.error(err))
}

export const decreasePostScoreAPI = (postId) => {
  const options = {
    method: 'post',
    headers: getAuthHeaders(),
    body: JSON.stringify({
      option: 'downVote'
    })
  }

  return fetch(`http://localhost:5001/posts/${postId}`, options)
  .then(
    res => {
      return res.json()
    }
  )
  .catch(err => console.error(err))
}

export const fetchComments = async (postId) => {
  const options = { method: 'get', headers: getAuthHeaders() }
  try {
    const res = await fetch(`http://localhost:5001/posts/${postId}/comments`, options)
    return res.json()
  } catch (err) {
    console.err(err)
  }
}