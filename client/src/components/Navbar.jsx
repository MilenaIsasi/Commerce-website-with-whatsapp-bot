import { Link, useNavigate } from "react-router-dom";
import './style/navbar.style.css'
import { useState } from "react";
import Cookies from 'js-cookie';
import axios from "axios";

export const Navbar = () => {
  const navigate = useNavigate();
  const login = () =>{
    navigate("/login")
  }

  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogout = () => {
    // Código para cerrar la sesión, por ejemplo:
    axios.post("http://localhost:8000/api/usuarios/salir", null, {
      withCredentials: true,
    })
    .then(() => {
      setLoggedIn(false);
      navigate("/");
    })
    .catch((error) => console.log(error));
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark fixed-top shadow-sm" id="navbar">
      <div className="container">
        <Link
          id="navbarnombre"
          className="navbar-brand text-white"
          to="/"
          style={{ textDecoration: "none" }}
        >
          🍕 PIZZERIA DOJO
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/add" >
                <li className="bi bi-cart4 mx-4" id="carrito"></li>
              </Link>
            </li>
            {loggedIn ? (
          <li>
            <button className="btn" onClick={handleLogout}>Cerrar sesión</button>
          </li>
        ) : (
          <li>
            <Link className="btn" to="/login">Iniciar sesión</Link>
          </li>
        )}
          </ul>
        </div>
        </div>
      </nav>
    </div>
  );
};
