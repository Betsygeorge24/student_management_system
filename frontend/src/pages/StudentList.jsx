import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import API from '../services/api'
import { toast } from 'react-toastify'

const StudentList = () => {
  const [students, setStudents] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const response = await API.get('/students/')
        setStudents(response.data)
      } catch (error) {
        toast.error('Could not load students.')
      } finally {
        setLoading(false)
      }
    }
    loadStudents()
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

  return (
    <>
      <Navbar />
      <div className="container py-4">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-3 mb-3">
          <div>
            <h2>Student List</h2>
            <p className="text-muted">Search, edit, or remove student records.</p>
          </div>
          <button className="btn btn-primary" onClick={() => navigate('/students/add')}>
            Add Student
          </button>
        </div>

        <div className="mb-3">
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
                    <td className="text-end">
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
                  <td colSpan="5" className="text-center py-4">
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
