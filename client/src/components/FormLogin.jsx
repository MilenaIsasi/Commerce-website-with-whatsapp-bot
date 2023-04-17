import React, { useState } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import "./style/login.css";
import axios from "axios";
import Swal from "sweetalert2";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

const FormLogin = () => {

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const { isLoggin, toggleLogin } = useContext(AuthContext);
  const goHome = () =>{
    navigate("/")
  };

const changeState = () => {
  toggleLogin();
};

  const onSubmit = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/usuario/login",
        values,
        { withCredentials: true }
      );
      console.log(response)
      if (response.status === 200) {
        Swal.fire({
          title: '¡Inicio de sesión exitoso!',
          icon: 'success',
          timer: 2000,
          timerProgressBar: true,
        });
        changeState();
  
        try {
          const roleResponse = await axios.get(
            "http://localhost:8000/api/admin",
            { withCredentials: true }
          );
  
          console.log(roleResponse)

          console.log(roleResponse.data.rol)
          // Verificar el rol del usuario
          if (roleResponse.data.rol === "admin") {
            navigate('/cpanel/adm');
          } else {
            navigate('/');
          }
        } catch (error) {
          if (error.response && error.response.status === 401) {
            navigate('/');
          } else {
            Swal.fire({
              title: 'Error',
              text: error.message,
              icon: 'error',
              timer: 2000,
              timerProgressBar: true,
            });
            console.error(error);
          }
        }
      } else {
        Swal.fire({
          title: 'Error',
          text: 'El inicio de sesión falló. Por favor, inténtalo de nuevo.',
          icon: 'error',
          timer: 2000,
          timerProgressBar: true,
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error.message,
        icon: 'error',
        timer: 2000,
        timerProgressBar: true,
      });
      console.error(error);
    }
  };
  
  const { handleSubmit, handleChange } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit,
  });


  return (
    <div className="registration-form" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>

        <form onSubmit={handleSubmit} style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection:"column"}}>
          <div className="form-group">
            <input
              className="form-control item"
              id="email"
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control item"
              id="password"
              type="password"
              placeholder="Contraseña"
              name="password"
              onChange={handleChange}
            />
            {errorMessage && (
              <p className="text-danger">{errorMessage}</p>
            )}
          </div>
          <div style={{display: "flex", justifyContent:"center", alignItems: "center"}}>
          <button
              type="submit"
              className="btn btn-block create-account mx-1"
              style={{display: "flex", justifyContent: "center", alignItems: "center"}}
            >
              Iniciar Sesion
            </button>
            <button className="btn btn-block create-account" onClick={goHome}> Volver </button>
          </div>
          <div className="form-group mt-4" >
            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <span> No tienes una ?<Link style={{color:"orange"}} to={'/register'} className=""> CREAR CUENTA </Link> </span>
            </div>
          </div>
        </form>
    </div>
  );
};

export default FormLogin;
