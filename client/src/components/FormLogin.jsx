import React, { useState } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import './style/login.css'
import axios from "axios";

const FormLogin = () => {

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [formErrors, setFormErrors] = useState({});

  const navigate = useNavigate();


  const { handleSubmit, handleChange } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      const resp = axios.post('http://localhost:8000/api/usuario/login', values, { withCredentials: true })
      console.log(resp)
      if(resp.data === 200){
        console.log(resp)
      }else{
        navigate('/home')
      }
    },
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
        </div>
        
        <div className="form-group">
          <button type="submit" className="btn btn-block create-account">
            Iniciar Sesion
          </button>
          <Link
            type="submit"
            className="btn btn-block create-account mx-5"
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
