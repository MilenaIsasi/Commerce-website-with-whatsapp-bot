import React from 'react'
import { Link } from "react-router-dom";
import AdministrarProductos from './AdministrarProductos';

export default function Header() {
  return (
<nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Panel de Admin</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to={'adm'} className="nav-link active" aria-current="page">Inicio</Link>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Administrar
          </a>
          <ul className="dropdown-menu">
            <li><Link to={'adm/users'} className="dropdown-item">Usuarios</Link></li>
            <li><Link to={'adm/products'} className="dropdown-item">Productos</Link></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>

  )
}
