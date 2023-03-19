import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  
  const navigate = useNavigate();
  const { handleSubmit, handleChange } = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword:"",
    },
    onSubmit: (values) => {
      const resp = axios.post(
        "http://localhost:8000/api/usuario",
        values,
        { withCredentials: true }
      );
      console.log(resp);
      if (resp.data === 200) {
        console.log(resp);
      } else {
        navigate("/");
      }
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
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
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
            className="btn btn-block create-account mx-5"
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
