import { useEffect, useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import API from '../services/api'
import { toast } from 'react-toastify'

const Dashboard = () => {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [greeting, setGreeting] = useState('Welcome back')

  useEffect(() => {
    const hour = new Date().getHours()
    setGreeting(hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening')
  }, [])

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await API.get('/students/')
        setStudents(response.data)
      } catch (error) {
        toast.error('Unable to load dashboard information.')
      } finally {
        setLoading(false)
      }
    }

    fetchStudents()
  }, [])

  const studentCount = students.length

  const averageAge = useMemo(() => {
    if (!students.length) return 0
    const totalAge = students.reduce((sum, student) => sum + Number(student.age || 0), 0)
    return Math.round(totalAge / students.length)
  }, [students])

  const topGrade = useMemo(() => {
    if (!students.length) return 'N/A'
    const gradeCounts = students.reduce((acc, student) => {
      const grade = student.grade || 'Unknown'
      acc[grade] = (acc[grade] || 0) + 1
      return acc
    }, {})
    return Object.entries(gradeCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A'
  }, [students])

  return (
    <>
      <Navbar />
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 mb-4">
            <div className="card shadow-sm border-0 dashboard-hero">
              <div className="card-body py-5 text-center">
                <h1 className="display-6 mb-2">{greeting}, Admin</h1>
                <p className="lead text-muted mb-3">
                  Manage your student records, check performance metrics, and keep the classroom organized.
                </p>
                <p className="text-muted small">
                  {loading ? 'Loading your dashboard...' : `You have ${studentCount} active student records.`}
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm border-0 metric-card h-100">
              <div className="card-body text-center">
                <h6 className="text-uppercase text-primary mb-3">Total Students</h6>
                <p className="display-5 mb-0">{loading ? '—' : studentCount}</p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mt-3 mt-md-0">
            <div className="card shadow-sm border-0 metric-card h-100">
              <div className="card-body text-center">
                <h6 className="text-uppercase text-info mb-3">Average Age</h6>
                <p className="display-5 mb-0">{loading ? '—' : averageAge}</p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mt-3 mt-md-0">
            <div className="card shadow-sm border-0 metric-card h-100">
              <div className="card-body text-center">
                <h6 className="text-uppercase text-success mb-3">Top Grade</h6>
                <p className="display-5 mb-0">{loading ? '—' : topGrade}</p>
              </div>
            </div>
          </div>

          <div className="col-12 mt-4">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title mb-3">Quick Actions</h5>
                <div className="row gx-3 gy-3">
                  <div className="col-md-4">
                    <div className="action-box p-3 rounded">
                      <strong>Student directory</strong>
                      <p className="mb-0 text-muted">Browse all records and search instantly across the roster.</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="action-box p-3 rounded">
                      <strong>Add new student</strong>
                      <p className="mb-0 text-muted">Capture new student details and keep enrollment data current.</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="action-box p-3 rounded">
                      <strong>Secure access</strong>
                      <p className="mb-0 text-muted">Protected routes require login so your data remains private.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
