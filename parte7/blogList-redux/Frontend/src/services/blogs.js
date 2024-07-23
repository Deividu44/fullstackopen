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

const getAllComments = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}/comments`)
  return response.data
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const createComment = async (newComment, id) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, newComment)
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

  const response = await axios.put(`${baseUrl}/${id}`, { likes: blogToUpdate.likes }, config)
  return response.data
}

export default {
  getAll,
  getAllComments,
  create,
  createComment,
  setToken,
  update,
  remove
}
