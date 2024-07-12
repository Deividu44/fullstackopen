import axios from 'axios'

const getData = async (baseUrl) => {
  const res = await axios.get(baseUrl)
  return res.data
}

const createData = async (baseUrl, resource) => {
  const res = await axios.post(baseUrl, resource)
  return res
}

export default { getData, createData }
