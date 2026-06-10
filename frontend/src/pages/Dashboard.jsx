import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import API from '../services/api'
import { toast } from 'react-toastify'

const Dashboard = () => {
  const [studentCount, setStudentCount] = useState(0)

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await API.get('/students/')
        setStudentCount(response.data.length)
      } catch (error) {
        toast.error('Unable to load dashboard information.')
      }
    }
    fetchStudents()
  }, [])

  return (
    <>
      <Navbar />
      <div className="container py-4">
        <div className="row">
          <div className="col-12 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h2 className="card-title">Dashboard</h2>
                <p className="card-text">Welcome to the Student Management Module. Use the navigation bar to manage students.</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm border-primary h-100">
              <div className="card-body text-center">
                <h5>Total Students</h5>
                <p className="display-5 mb-0">{studentCount}</p>
              </div>
            </div>
          </div>

          <div className="col-md-8 mt-3 mt-md-0">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">Quick Actions</h5>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">View the student list and perform edits or deletes.</li>
                  <li className="list-group-item">Add new students with email, grade, and age data.</li>
                  <li className="list-group-item">Use protected routes to keep data secure.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
