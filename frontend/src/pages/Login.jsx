import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import API, { setAuthHeader } from '../services/api'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [helperText, setHelperText] = useState('Enter your credentials to continue.')
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Login • SchoolAdmin'
  }, [])

  useEffect(() => {
    if (loading) {
      setHelperText('Signing you in...')
    } else if (!username || !password) {
      setHelperText('Enter your credentials to continue.')
    } else {
      setHelperText('Ready to login.')
    }
  }, [username, password, loading])

  useEffect(() => {
    const token = localStorage.getItem('studentAppToken')
    if (token) {
      navigate('/dashboard', { replace: true })
      return
    }

    const autoLogin = async () => {
      setLoading(true)
      try {
        const response = await API.post('/login/', { username: 'admin', password: 'adminpass' })
        const token = response.data.token
        localStorage.setItem('studentAppToken', token)
        setAuthHeader(token)
        toast.success('Logged in as default admin')
        navigate('/dashboard', { replace: true })
      } catch (error) {
        console.error('Default login failed', error)
      } finally {
        setLoading(false)
      }
    }

    autoLogin()
  }, [navigate])

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!username || !password) {
      toast.error('Please enter username and password')
      return
    }
    setLoading(true)
    try {
      const response = await API.post('/login/', { username, password })
      const token = response.data.token
      localStorage.setItem('studentAppToken', token)
      setAuthHeader(token)
      toast.success('Login successful')
      navigate('/dashboard')
    } catch (error) {
      toast.error('Login failed. Check credentials and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h3 className="card-title mb-3 text-center">Student Management Login</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="admin"
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="adminpass"
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                  {loading ? 'Signing in...' : 'Login'}
                </button>
              </form>
              <div className="mt-3 text-center text-muted small">{helperText}</div>
              <div className="mt-2 text-center text-muted small">
                Automatic default login is enabled using admin / adminpass.
              </div>
              <div className="mt-2 text-center text-muted small">
                Sample credentials: admin / adminpass
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
