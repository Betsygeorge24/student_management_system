import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import API from '../services/api'
import { toast } from 'react-toastify'

const EditStudent = () => {
  const { id } = useParams()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [age, setAge] = useState('')
  const [grade, setGrade] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await API.get(`/students/${id}/`)
        setName(response.data.name)
        setEmail(response.data.email)
        setAge(response.data.age)
        setGrade(response.data.grade)
      } catch (error) {
        toast.error('Could not load student data.')
        navigate('/students')
      } finally {
        setLoading(false)
      }
    }
    fetchStudent()
  }, [id, navigate])

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!name || !email || !age || !grade) {
      toast.error('Please fill out every field.')
      return
    }
    setSaving(true)
    try {
      await API.put(`/students/${id}/`, { name, email, age: Number(age), grade })
      toast.success('Student updated successfully.')
      navigate('/students')
    } catch (error) {
      toast.error(error.response?.data?.email ? error.response.data.email[0] : 'Update failed.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container py-5 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-lg-7">
            <div className="card shadow-sm">
              <div className="card-body">
                <h2 className="card-title mb-3">Edit Student</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Student full name"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="student@example.com"
                    />
                  </div>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Age</label>
                      <input
                        type="number"
                        className="form-control"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        placeholder="15"
                        min="1"
                      />
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Grade</label>
                      <input
                        className="form-control"
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                        placeholder="10"
                      />
                    </div>
                  </div>
                  <button className="btn btn-primary" type="submit" disabled={saving}>
                    {saving ? 'Saving...' : 'Update Student'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditStudent
