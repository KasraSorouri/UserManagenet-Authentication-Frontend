import axios from 'axios'

import { api_url } from '../../../configs/config'
import setToken from './authentication'

const getUsers = async() => {
  const res = await axios.get(`${api_url}/auth/user`)
  return res.data
}

const createUser = async(userData) => {
  const token = setToken()
  const config = {
    headers: { Authorization: token },
  }

  try {
    const res = await axios.post(`${api_url}/auth/user`, userData, config)
    return res.data
  } catch (err) {
    console.log('**** error:', err.message)
  }
}

export default {
  getUsers,
  createUser
}