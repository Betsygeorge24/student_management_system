import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useEffect, useState } from 'react'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import StudentList from './pages/StudentList'
import AddStudent from './pages/AddStudent'
import EditStudent from './pages/EditStudent'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import { setAuthHeader } from './services/api'

function App() {
  const [isTokenReady, setIsTokenReady] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('studentAppToken')
    if (token) {
      setAuthHeader(token)
    }
    setIsTokenReady(true)
  }, [])

  if (!isTokenReady) {
    return <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}></div>
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/students" element={<StudentList />} />
          <Route path="/students/add" element={<AddStudent />} />
          <Route path="/students/:id/edit" element={<EditStudent />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={2500} pauseOnHover />
    </BrowserRouter>
  )
}

export default App
