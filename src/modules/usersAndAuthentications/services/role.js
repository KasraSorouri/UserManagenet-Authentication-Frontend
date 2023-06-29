import axios from 'axios'

import { api_url } from '../../../configs/config'
import setToken from './authentication'


// Get all Roles
const getRoles = async() => {
  const res = await axios.get(`${api_url}/auth/role`)
  return res.data
}

// Create Role
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

// Update a Role
const editRole = async(roleData) => {
  const token = setToken()
  const config = {
    headers: { Authorization: token },
  }

  const { id, ...roleEditedData } = roleData
  try{
    const res = await axios.put(`${api_url}/auth/role/${id}`, roleEditedData, config)
    return res.data
  } catch (err) {
    console.log('**** error:', err.message)
  }
}

export default {
  getRoles,
  createRole,
  editRole
}