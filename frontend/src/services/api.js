import axios from 'axios'

const backendURL = import.meta.env.VITE_BACKENDURL || process.env.REACT_APP_BACKENDURL || 'http://127.0.0.1:8000'

const API = axios.create({
  baseURL: `${backendURL}/api`,
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
