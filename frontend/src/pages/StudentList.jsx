import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import API from '../services/api'
import { toast } from 'react-toastify'

const StudentList = () => {
  const [students, setStudents] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('Search by name, email, or grade.')
  const [refreshing, setRefreshing] = useState(false)
  const navigate = useNavigate()

  const fetchStudents = useCallback(async () => {
    try {
      const response = await API.get('/students/')
      setStudents(response.data)
    } catch (error) {
      toast.error('Could not load students.')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [])

  useEffect(() => {
    fetchStudents()
  }, [fetchStudents])

  useEffect(() => {
    document.title = 'Student List • SchoolAdmin'
  }, [])

  const filteredStudents = useMemo(
    () =>
      students.filter((student) => {
        const term = search.toLowerCase()
        return (
          student.name.toLowerCase().includes(term) ||
          student.email.toLowerCase().includes(term) ||
          student.grade.toLowerCase().includes(term)
        )
      }),
    [students, search]
  )

  useEffect(() => {
    if (loading) {
      setMessage('Loading student records...')
    } else if (!search) {
      setMessage('Search by name, email, or grade.')
    } else {
      setMessage(`${filteredStudents.length} ${filteredStudents.length === 1 ? 'result' : 'results'} found`)
    }
  }, [loading, search, filteredStudents.length])

  const handleDelete = async (studentId) => {
    const confirmed = window.confirm('Delete this student permanently?')
    if (!confirmed) {
      return
    }
    try {
      await API.delete(`/students/${studentId}/`)
      setStudents((prev) => prev.filter((item) => item.id !== studentId))
      toast.success('Student deleted successfully.')
    } catch (error) {
      toast.error('Unable to delete student.')
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await fetchStudents()
  }

  return (
    <>
      <Navbar />
      <div className="container py-4">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-3 mb-3">
          <div>
            <h2>Student List</h2>
          
            <small className="text-secondary">{message}</small>
          </div>

          <div className="d-flex flex-wrap gap-2">
            <button className="btn btn-outline-secondary" onClick={() => setSearch('')} disabled={!search}>
              Clear Search
            </button>
            <button className="btn btn-outline-primary" onClick={handleRefresh} disabled={refreshing}>
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </button>
            <button className="btn btn-primary" onClick={() => navigate('/students/add')}>
              Add Student
            </button>
          </div>
        </div>

        <div className="mb-3 search-panel">
          <input
            className="form-control"
            placeholder="Search by name, email, or grade"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="table-responsive shadow-sm">
          <table className="table table-hover align-middle mb-0 bg-white">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Grade</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    Loading students...
                  </td>
                </tr>
              ) : filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.age}</td>
                    <td>{student.grade}</td>
                    <td className="text-end student-actions">
                      <button
                        className="btn btn-sm btn-outline-secondary me-2"
                        onClick={() => navigate(`/students/${student.id}/edit`)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(student.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-muted">
                    No students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default StudentList
