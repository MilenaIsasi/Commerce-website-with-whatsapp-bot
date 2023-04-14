import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from "yup";

const Register = () => {

  const validationSchema = Yup.object({
    name: Yup.string().min(3, "El nombre debe tener al menos 3 letras").required("El nombre es requerido"),
    lastName: Yup.string().min(3, "El apellido debe tener al menos 3 letras").required("El apellido es requerido"),
    email: Yup.string().email("El correo electrónico no es válido").required("El correo electrónico es requerido"),
    password: Yup.string().min(3, "La contraseña debe tener al menos 3 caracteres").required("La contraseña es requerida"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir")
      .required("La confirmación de la contraseña es requerida"),
  });
  
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const { handleSubmit, handleChange, errors } = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword:"",
      rol:"cliente"
    }, validationSchema,
    onSubmit: (values) => {
      console.log(values);
      axios
        .post("http://localhost:8000/api/usuario", values, { withCredentials: true })
        .then((resp) => {
          console.log(resp);
          if (resp.data === 200) {
            console.log(resp);
          } else {
            navigate("/");
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            setErrorMessage("* Ya existe un usuario registrado con este correo.");
          } else {
            console.error(error);
          }
        });
    },
  });

  return (
    <>
            <div>
            <ToastContainer position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"/>
        </div>
    <div className="registration-form">
      <form onSubmit={handleSubmit}>
        <div className="form-icon">
          <span>
            <i className="bi bi-person-circle"></i>
          </span>
        </div>
        <div className="form-group">
        {errors.name ? <div className="error-message" style={{color:"red"}}>{errors.name}</div> : null}
          <input
            className="form-control item"
            id="name"
            type="name"
            placeholder="Name"
            name="name"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
        {errors.lastName ? <div className="error-message" style={{color:"red"}}>{errors.lastName}</div> : null}

        <input
            className="form-control item"
            id="lastName"
            type="lastName"
            placeholder="Last Name"
            name="lastName"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          
        <div className="error-message" style={{color:"red"}}>{errorMessage}</div>
        {errors.email ? <div className="error-message" style={{color:"red"}}>{errors.email}</div> : null}  
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
        {errors.password ? <div className="error-message" style={{color:"red"}}>{errors.password}</div> : null}
        <input
            className="form-control item"
            id="password"
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
        {errors.confirmPassword ? <div className="error-message" style={{color:"red"}}>{errors.confirmPassword}</div> : null}
        <input
            className="form-control item"
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-block create-account" >
            Crear cuenta
          </button>
          <Link
            type="submit"
            className="btn btn-block create-account mx-2"
            to="/"
          >
            Volver
          </Link>
        </div>
      </form>
      <div className="social-media">
        <h5>Seguinos en nuestras Redes Sociales!</h5>
        <div className="social-icons">
          <Link to="/">
            <i className="bi bi-facebook"></i>
          </Link>
          <Link to="/">
            <i className="bi bi-instagram"></i>
          </Link>
          <Link to="/">
            <i className="bi bi-whatsapp"></i>
          </Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default Register;
