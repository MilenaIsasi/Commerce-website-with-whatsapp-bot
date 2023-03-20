import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'

const Salir = () => {
  

  const handleLogin = () => { axios.get("http://localhost:8000/api/usuarios/salir")
  }

  return (
    <>
      <Link className="nav-link" to="/">
        <i className="bi bi-box-arrow-left" id="sesion" onClick={handleLogin}></i>
      </Link>
    </>
  )
}

export default Salir