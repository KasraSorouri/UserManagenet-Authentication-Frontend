import axios from 'axios'

import { api_url } from '../../../configs/config'

const getRights = async() => {
  const res = await axios.get(`${api_url}/auth/right`)
  return res.data
}

export default {
  getRights
}