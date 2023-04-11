import React, { useState } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import './style/login.css'
import axios from "axios";

const FormLogin = () => {

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/usuario/login",
        values,
        { withCredentials: true }
      );
      console.log(response);
      if (response.data === 200) {
        console.log(response);
      } else {
        navigate("/home");
      }
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage(" * Datos inválidos");
      } else {
        setErrorMessage(" * Datos inválidos");
      }
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
    <div className="registration-form">
      <form onSubmit={handleSubmit}>
        <div className="form-icon">
          <span>
          <i className="bi bi-person-circle"></i>
          </span>
        </div>
        <div className="form-group">
          <input
          className="form-control item" 
          id="email"
            type="email"
            placeholder="email"
            name="email"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            className="form-control item" 
            id="password"
            type="password"
            placeholder="password"
            name="password"
            onChange={handleChange}
          />
                  {errorMessage && <p className="text-danger">{errorMessage}</p>}
        </div>
        
        <div className="form-group">
          <button type="submit" className="btn btn-block create-account mx-3">
            Iniciar Sesion
          </button>
          <Link
            type="submit"
            className="btn btn-block create-account"
            to="/register"
          >
            Registrarse
          </Link>
        </div>
        
      </form>
      <div className="social-media">
        <h5>Seguinos en nuestras Redes Sociales!</h5>
        <div className="social-icons">
          <Link to='/'>
          <i className="bi bi-facebook"></i>
          </Link>
          <Link to='/'>
          <i className="bi bi-instagram"></i>
          </Link>
          <Link to='/'>
          <i className="bi bi-whatsapp"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FormLogin;
