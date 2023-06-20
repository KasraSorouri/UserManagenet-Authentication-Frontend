import axios from 'axios'

import { api_url } from '../../../configs/config'
import setToken from './authentication'

const getRoles = async() => {
  const res = await axios.get(`${api_url}/auth/role`)
  return res.data
}

const createRole = async(roleData) => {
  const token = setToken()
  const config = {
    headers: { Authorization: token },
  }

  try {
    const res = await axios.post(`${api_url}/auth/role`, roleData, config)
    return res.data
  } catch (err) {
    console.log('**** error:', err.message)
  }
}

export default {
  getRoles,
  createRole
}