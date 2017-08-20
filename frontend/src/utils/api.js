export const fetchCategories = () => {
  const headers = new Headers();
  headers.append('Authorization', 'xcx')
  const options = { method: 'get', headers }

  return fetch('http://localhost:5001/categories', options)
    .then(
      res => res.json()
    )
    .catch(err => console.error(err))
}
