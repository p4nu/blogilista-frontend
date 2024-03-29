import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)

  return response.data
}

const update = async (object, objectId) => {
  const response = await axios.put(`${baseUrl}/${objectId}`, object)

  return response.data
}

const remove = async object => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${object.id}`, config)

  return response.data
}

export default { getAll, create, setToken, update, remove }
