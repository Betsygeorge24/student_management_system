import axios from 'axios'

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const setAuthHeader = (token) => {
  if (token) {
    API.defaults.headers.common.Authorization = `Token ${token}`
  } else {
    delete API.defaults.headers.common.Authorization
  }
}

export const logout = () => {
  localStorage.removeItem('studentAppToken')
  setAuthHeader(null)
}

export default API
