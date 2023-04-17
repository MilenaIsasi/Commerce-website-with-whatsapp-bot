import axios from 'axios'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import Swal from 'sweetalert2';

const SalirBtn = () => {
  const navigate = useNavigate();
  const { isLoggin, toggleLogin } = useContext(AuthContext);

  const changeState = () => {
    axios.get("http://localhost:8000/api/usuarios/salir", {
      withCredentials: true,
    })
    .then(() => {
      toggleLogin();
      navigate("/");
      Swal.fire({
        icon: 'success',
        title: 'Cierre de sesión exitoso',
        showConfirmButton: false,
        timer: 1500
      });
    })
    .catch((error) => console.log(error));
};
  return (
    <>
      <Link to="/">
        <i className="btn" id="sesion" onClick={changeState}>Cerrar Sesion</i>
      </Link>
    </>
  )
}

export default SalirBtn