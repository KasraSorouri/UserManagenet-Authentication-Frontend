import axios from 'axios'

import { api_url } from '../../../configs/config'

const getUsers = async() => {
  const res = await axios.get(`${api_url}/auth/user`)
  return res.data
}

export default {
  getUsers
}