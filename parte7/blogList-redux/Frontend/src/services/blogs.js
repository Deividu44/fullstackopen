import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const remove = async id => {
  const config = {
    headers: { Authorization: token }
  }
  await axios.delete(`${baseUrl}/${id}`, config)
}

const update = async (blogToUpdate, id) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.put(`${baseUrl}/${id}`, blogToUpdate, config)
  return response.data
}

export default {
  getAll,
  create,
  setToken,
  update,
  remove
}
