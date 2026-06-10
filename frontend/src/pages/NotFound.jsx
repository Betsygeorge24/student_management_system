import { Link } from 'react-router-dom'

const NotFound = () => (
  <div className="container py-5">
    <div className="row justify-content-center">
      <div className="col-md-8 text-center">
        <h1 className="display-4">404</h1>
        <p className="lead">Page not found. Please use the navigation to continue.</p>
        <Link className="btn btn-primary" to="/login">
          Back to Login
        </Link>
      </div>
    </div>
  </div>
)

export default NotFound
