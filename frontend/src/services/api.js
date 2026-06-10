import axios from 'axios'

const API = axios.create({
  baseURL: 'https://student-management-system-2omp.onrender.com/api',
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