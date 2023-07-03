import axios from 'axios'

import { api_url } from '../../../configs/config'
import setToken from './authentication'

const getRights = async() => {
  const res = await axios.get(`${api_url}/auth/right`)
  return res.data
}

const createRight = async(rightData) => {
  const token = setToken()
  const config = {
    headers: { Authorization: token },
  }

  try {
    const res = await axios.post(`${api_url}/auth/right`, rightData, config)
    return res.data
  } catch (err) {
    const errorMessage = err.response.data.error || err.message
    throw new Error(`${errorMessage}`)
  }
}

export default {
  getRights,
  createRight
}