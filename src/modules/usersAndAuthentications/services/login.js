import axios from 'axios'
import { api_url } from '../../../configs/config'

const login = async(credentials) => {
  const { username, password } = credentials
  try {
    const result = await axios.post(`${api_url}/auth/login`,  { username, password })
    return result
  } catch (err) {
    console.log('err ->', err)
  }
}

export default {
  login
}

