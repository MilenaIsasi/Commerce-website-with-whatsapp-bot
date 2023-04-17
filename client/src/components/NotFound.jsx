import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
return (
  <div className="d-flex align-items-center justify-content-center vh-100 bg-primary">
    <div>
      <h1 className="display-1 fw-bold text-white">404</h1>
      <div>
        <Link to="/" className="btn btn-primary">
          Volver
        </Link>
      </div>
    </div>
  </div>
);
}

export default NotFound