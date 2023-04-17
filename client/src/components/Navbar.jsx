import { Link, useNavigate } from "react-router-dom";
import "./style/navbar.style.css";
import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import SalirBtn from "./SalirBtn";

export const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggin, setIsLoggin } = useContext(AuthContext);


  const handleLogout = () => {
    // Código para cerrar la sesión, por ejemplo:
    axios
      .post("http://localhost:8000/api/usuarios/salir", null, {
        withCredentials: true,
      })
      .then(() => {
        setIsLoggin(false); // Establece el estado de inicio de sesión a falso
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  // Verifica si el usuario ya inició sesión
  useEffect(() => {
    console.log(isLoggin)
    axios
      .get("http://localhost:8000/api/userauth", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response)
        setIsLoggin(true); // Establece el estado de inicio de sesión
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-light bg-dark fixed-top shadow-sm"
        id="navbar"
      >
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
                <Link className="nav-link text-white" to="/add">
                  <li className="bi bi-cart4 mx-4" id="carrito"></li>
                </Link>
              </li>
              <li className="nav-item mt-2">
                {isLoggin ? (
                  <Link className="btn" to={'/login'}>Iniciar sesión</Link>
                ) : (
                  <SalirBtn />
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
